import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { CPKDALService } from '../cpkdal.service';

const getFileName = (name: string) => {
  let timeSpan = new Date();
  let sheetName = name || "Monthly Report";
  let fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName
  };
};

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-monthlyreport',
  templateUrl: './monthlyreport.component.html',
  styleUrls: ['./monthlyreport.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class MonthlyreportComponent implements OnInit {

  dataSourceMain: any = [];
  dataSource: any = [];
  plants: any = []
  arry: any;
  arr: any = [];
  MsgArr: any = [];
  Frame: any;
  PartList: any = [] // ['P1090080']
  PRDPlanList: any = ['Yes', 'No']
  distinctarray: any;
  dataSourceShow: any = false;
  showbtn: any = false;
  columns: any = []
  displayedColumns: any = []
  drpserver = [];
  drpserverselected: any = [];
  drpserversetting = {};
  partselected: any = [];

  constructor(
    private router: Router, private formBuilder: FormBuilder,
     private datePipe: DatePipe, private activatedRouter: ActivatedRoute, 
     public dialog: MatDialog, private rpt_service: CPKDALService, private spinner: NgxSpinnerService) { }
     profileForm = new FormGroup({
      // Plant: new FormControl(''),
      MATNR: new FormControl(''),
      PartDesc: new FormControl(''),
      Supplier: new FormControl(''),
      datefrom: new FormControl(''),
      dateto: new FormControl(''),
      item_text: new FormControl('')
    });

  ngOnInit(): void {
    this.GetParts();
  }
  GetParts() {
    if (sessionStorage.getItem('VendorID')?.trim() != null) {
      this.spinner.show();
      //this.rpt_service.GetCPKPartMaster(sessionStorage.getItem('VendorID')).subscribe(
      this.rpt_service.GetCPKPartMasterNew(sessionStorage.getItem('VendorID')).subscribe(
        data => {
          console.log('PARTS', JSON.parse(data.toString()))

          this.PartList = JSON.parse(data.toString())

          this.drpserver = JSON.parse(data.toString())

          console.log('PARTS New', this.drpserver)
          this.spinner.hide();
        }
      );
      this.drpserversetting = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
      };

    }
    else {
      Swal.fire({
        icon: 'error',
        text: 'Session expired!!!'
      })
      this.router.navigate(['vlogin'])
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
  }

  GetLot() {
    if (sessionStorage.getItem('VendorID')?.trim() != null) {
      console.log('PartNoselected', this.partselected)
      if (this.partselected != '' && this.profileForm.value.datefrom != '' && this.profileForm.value.dateto != '') {
        //this.rpt_service.GetMonthlyReport(sessionStorage.getItem('VendorID'), this.profileForm.value.MATNR, this.profileForm.value.datefrom, this.profileForm.value.dateto).subscribe(
        this.rpt_service.GetMonthlyReport(sessionStorage.getItem('VendorID'), this.partselected, this.profileForm.value.datefrom, this.profileForm.value.dateto).subscribe(
          data => {
            this.spinner.show();

            setTimeout(() => {
              this.spinner.hide();
            }, 2000);

            let ref = JSON.parse(data.toString())
            console.log('MonthlyReport', ref)
            //if (JSON.parse(data.toString()).length > 0) {
            if (ref[0].Material.toString() != "") {
              this.dataSourceShow = true
              this.showbtn = true

              this.dataSource = JSON.parse(data.toString())
              //this.dataSourceMain = new MatTableDataSource(JSON.parse(data.toString())) //To bind data to details table

              // Get list of columns by gathering unique keys of objects found in DATA.
              const columns = this.dataSource
                .reduce((columns: any, row: {}) => {
                  return [...columns, ...Object.keys(row)]
                }, [])
                .reduce((columns: string | any[], column: any) => {
                  return columns.includes(column)
                    ? columns
                    : [...columns, column]
                }, [])
              // Describe the columns for <mat-table>.
              this.columns = columns.map((column: string | number) => {
                return {
                  columnDef: column,
                  header: column,
                  cell: (element: any) => `${element[column] ? element[column] : ``}`
                }
              })
              this.displayedColumns = this.columns.map((c: { columnDef: any; }) => c.columnDef);
              console.log('displayedColumns', this.displayedColumns)
              // Set the dataSource for <mat-table>.
              this.dataSourceMain = JSON.parse(data.toString())
              console.log('dataSourceMain', this.dataSourceMain)


            }
            else {
              this.dataSourceShow = false
              this.showbtn = false

              Swal.fire({
                icon: 'error',
                text: 'No Records Found !!!'
              })
            }
          }
        );
      }
      else {
        Swal.fire({
          icon: 'error',
          text: 'Fill all the *Mandtory Fields !!!'
        })
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        text: 'Session Expired!!!'
      })
      this.router.navigate(['vlogin'])
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
  }

  Export() {
    if (this.dataSource != null) {

      console.log('ExportReport', this.dataSource)
      const workSheet = XLSX.utils.json_to_sheet(this.dataSource);
      const workBook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
      let { sheetName, fileName } = getFileName('');
      XLSX.writeFile(workBook, fileName + '.xlsx');
    }
    else {
      Swal.fire({
        icon: 'error',
        text: 'Data Not Found!!!'
      })
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
  }

  onFilterChange(item: any) {
    console.log(item);
  }
  onDropDownClose(item: any) {
    console.log(item);
  }

  onItemSelect(item: any) {
    console.log(item);
    this.partselected.push(item.item_text);
  }
  onDeSelect(item: any) {
    this.partselected.splice(this.partselected.indexOf(item.item_text), 1);
    console.log('onDeSelect', this.partselected);
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', this.partselected);
  }
  onDeSelectAll(items: any) {
    console.log(items);
    this.partselected = [];
  }
  DataEntry1() {
    //this.router.navigate(['dataentrymain'])
    var FDT =  window.btoa('123')
    var TDT =  window.btoa('123')
    var Part = window.btoa('123')
    this.router.navigate(['dataentrymain/' + FDT + '/' + TDT + '/' + Part])
  }
  

}
