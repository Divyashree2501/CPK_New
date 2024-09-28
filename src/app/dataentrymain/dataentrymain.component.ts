import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CPKDALService } from '../cpkdal.service';


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
  selector: 'app-dataentrymain',
  templateUrl: './dataentrymain.component.html',
  styleUrls: ['./dataentrymain.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]

})
export class DataentrymainComponent implements OnInit {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,5}$/g);
  // plants:any[]=['Plant 1','Plant 2','Mysore','HP','3W'];
  displayedColumns: string[] = ['Position', 'LIFNR', 'MATNR', 'MAKTX', 'DRW_ISSUE', 'DRW_REVISION', 'PRUEFLOS', 'LOT_CRDATE', 'STATUS', 'SUP_LINE', 'PROD_PLAN'];
  dataSourceMain: any = [];
  dataSource: any;
  datasource: any;
  plants: any = []
  arry: any;
  arr: any = [];
  MsgArr: any = [];
  Frame: any;
  PartList: any = ['P1090080'] // ['N9090660']
  PRDPlanList: any = ['Yes', 'No']
  distinctarray: any;
  btnShow: any = false;
  dataSourceShow: any = false;
  drpserver = [];
  drpserverselected: any = [];
  drpserversetting = {};
  partselected: any = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe,private activatedRouter: ActivatedRoute, public dialog: MatDialog, 
    private rpt_service:CPKDALService, private spinner: NgxSpinnerService) { }
    profileForm = new FormGroup({
      // Plant: new FormControl(''),
      MATNR: new FormControl(''),
      PartDesc: new FormControl(''),
      Supplier: new FormControl(''),
      datefrom: new FormControl(''),
      dateto: new FormControl(''),
      item_text: new FormControl(''),
      PartNo:new FormControl('')
    });



  ngOnInit(): void {
    this.LoadData()
  }
  LoadData()
  {
    this.spinner.show();

    var paramsSub6: any = this.activatedRouter.snapshot.params['FDT'];
    var FDT = window.atob(paramsSub6)
    console.log('FDT', FDT)
    var paramsSub7: any = this.activatedRouter.snapshot.params['TDT'];
    var TDT = window.atob(paramsSub7)
    var paramsSub8: any = this.activatedRouter.snapshot.params['Part'];
    var Part = window.atob(paramsSub8)
    if (FDT != '123' && TDT != '123' && Part != '123') {
      this.GetParts();
      //this.profileForm.controls['MATNR'].setValue([Part])
      this.drpserver 
      this.partselected.push(Part);
      console.log('SPart', Part)
      console.log('SPart1', this.partselected)
      
      this.profileForm.controls['datefrom'].setValue(this.datePipe.transform(FDT, 'yyyy-MM-dd'))
      this.profileForm.controls['dateto'].setValue(this.datePipe.transform(TDT, 'yyyy-MM-dd'))
      if (sessionStorage.getItem('VendorID')?.trim() != null) {
        // this.rpt_service.GetLotNo(sessionStorage.getItem('VendorID'), this.profileForm.value.MATNR, this.profileForm.value.datefrom, this.profileForm.value.dateto).subscribe(
        this.rpt_service.GetLotNo(sessionStorage.getItem('VendorID'), this.partselected, this.profileForm.value.datefrom, this.profileForm.value.dateto).subscribe(
          data => {
            console.log('PrevLotData', JSON.parse(data.toString()))
            if (JSON.parse(data.toString()).length > 0) {
              this.btnShow = true
              this.dataSourceShow = true

              this.dataSource = JSON.parse(data.toString())
              this.dataSourceMain = new MatTableDataSource(JSON.parse(data.toString())) //To bind data to details table

            }
            else {
              this.btnShow = false
              this.dataSourceShow = false
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
          text: 'Inspection Lot No. Not Passed!!!'
        })
        this.router.navigate(['vlogin'])
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      }
    }
    else {
      this.GetParts();
    }
    
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
      // console.log('PartNo', this.profileForm.value.MATNR)
      console.log('PartNoselected', this.partselected)
      if (this.partselected != '' && this.profileForm.value.datefrom != '' && this.profileForm.value.dateto != '') {
        // this.rpt_service.GetLotNo(sessionStorage.getItem('VendorID'), this.profileForm.value.MATNR, this.profileForm.value.datefrom, this.profileForm.value.dateto).subscribe(
        this.rpt_service.GetLotNo(sessionStorage.getItem('VendorID'), this.partselected, this.profileForm.value.datefrom, this.profileForm.value.dateto).subscribe(
          data => {
            this.spinner.show();

            setTimeout(() => {
              this.spinner.hide();
            }, 2000);

            let ref = JSON.parse(data.toString())
            console.log('LotData', ref)
            //if (JSON.parse(data.toString()).length > 0) {
            if (ref[0].MATNR.toString() != "") {
              this.btnShow = true
              this.dataSourceShow = true

              this.dataSource = JSON.parse(data.toString())
              this.dataSourceMain = new MatTableDataSource(JSON.parse(data.toString())) //To bind data to details table

            }
            else {
              this.btnShow = false
              this.dataSourceShow = false

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

  InspLotLink(row: any) {
    console.log(row.PRUEFLOS)
    //this.router.navigate(["dataentrytwo/" + row.PRUEFLOS])
    // sessionStorage.setItem("Screen1", "1");
    // sessionStorage.setItem("Screen1Mat", this.profileForm.value.);
    // sessionStorage.setItem("ScreenFDT", this.profileForm.value.datefrom);
    // sessionStorage.setItem("ScreenTDT", this.profileForm.value.dateto);

    var PRUEFLOS = window.btoa(row.PRUEFLOS)
    var DRW_ISSUE = window.btoa(row.DRW_ISSUE)
    var DRW_REVISION = window.btoa(row.DRW_REVISION)
    var SUP_LINE = window.btoa(row.SUP_LINE)
    var STATUS = window.btoa(row.STATUS)
    var FDT = window.btoa(this.profileForm.value.datefrom!)
    var TDT = window.btoa(this.profileForm.value.dateto!)
    if (STATUS != 'Open') {
      // if (SUP_LINE != '' && DRW_ISSUE != '' && DRW_REVISION != '') {
      if (SUP_LINE != '') { var SUP_LINE = window.btoa(row.SUP_LINE) } else { var SUP_LINE = window.btoa("1") }
      if (DRW_ISSUE != '') { var DRW_ISSUE = window.btoa(row.DRW_ISSUE) } else { var DRW_ISSUE = window.btoa("1") }
      if (DRW_REVISION != '') { var DRW_REVISION = window.btoa(row.DRW_REVISION) } else { var DRW_REVISION = window.btoa("1") }
      this.router.navigate(['dataentrytwo/' + PRUEFLOS + '/' + DRW_ISSUE + '/' + DRW_REVISION + '/' + SUP_LINE + '/' + STATUS + '/' + FDT + '/' + TDT])
      // }
      // else {
      //   var SUP_LINE = window.btoa("1")
      //   this.router.navigate(['dataentrytwo/' + PRUEFLOS + '/' + DRW_ISSUE + '/' + DRW_REVISION + '/' + SUP_LINE + '/' + STATUS + '/' + FDT + '/' + TDT])
      // }

    }
    else {
      Swal.fire({
        icon: 'error',
        text: 'Kindly Submit Production Plan for Lot No.: ' + row.PRUEFLOS + '!!'
      })
    }
  }

  btnSubmit() {
    console.log(sessionStorage.getItem('VendorID'))
    if (sessionStorage.getItem('VendorID')?.trim() != null) {
      if (this.partselected != '' && this.profileForm.value.datefrom != '' && this.profileForm.value.dateto != '') {
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        this.arr = []
        this.arr = this.dataSourceMain["filteredData"]

        // this.flag = []
        // this.flag1 = []
        // for (var i = 0, len = this.arr.length; i < len; i++) {
        //   console.log('Checkbox', this.arr[i].CHECKBOX);
        //   if (this.arr[i].CHECKBOX == '') {
        //     this.flag = '0'
        //   }
        //   else {
        //     this.flag1 = '1'
        //   }
        // }

        // if (this.flag1 != '1') {
        //   Swal.fire({
        //     icon: 'error',
        //     text: 'Kindly Select CheckBox!!!'
        //   })
        // }
        // else {
        this.arr.forEach((element: any) => {

          element.MATNR = this.profileForm.value.PartNo

        });
        console.log('Savedata', JSON.parse(JSON.stringify(this.arr)))
        this.rpt_service.SaveInspectionLotPrdPlan(JSON.parse(JSON.stringify(this.arr))).subscribe(

          data => {
            let ref = JSON.parse(data.toString())
            console.log(ref)
            //if (JSON.parse(data.toString()).length > 0) {
            if (ref[0].MsgText.toString() != "") {
              Swal.fire({
                icon: 'success',
                text: JSON.parse(data.toString())[0].MsgText, //JSON.parse(data.toString())[0].MsgText 
              })
              setTimeout(() => {
                this.spinner.hide();
              }, 2000);
            }
            else {
              Swal.fire({
                icon: 'error',
                text: 'Kindly Try Again!!!!'
              })
            }
          }
        )
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
