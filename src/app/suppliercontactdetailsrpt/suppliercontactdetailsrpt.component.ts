import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CPKDALService } from '../cpkdal.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-suppliercontactdetailsrpt',
  templateUrl: './suppliercontactdetailsrpt.component.html',
  styleUrls: ['./suppliercontactdetailsrpt.component.css']
})


export class SuppliercontactdetailsrptComponent implements OnInit {
  @ViewChild('select') select!: MatSelect;


  

  profileForm = new FormGroup({
    VendorId:new FormControl(''),
    VendorName:new FormControl(''),
    VendorCategory:new FormControl(''),
  })


  public vendorCategorydetail:Array<any>=[];
  dataSourceMain: any = [];
  displayedColumnheader: string[] = ['id','VendorID','VendorName','VendorCategory','ProductionHouse',
  'VendorAddress','PinCode','LandlinePhoneNo','VCIPAddress','SupplierCEOName','SupplierCEOPhoneNo',
  'SupplierCEOEmailId','BusinessheadName','BusinessheadEmailId','BusinessheadPhoneNo','PlantheadName','PlantheadEmailId','PlantheadPhoneNo',
  'MarketingFirstName','MarketingFirstPhoneNo','FinanceFirstName','FinanceFirstEmailId','FinanceFirstPhoneNo','QualityheadName','QualityheadEmailId','QualityheadPhoneNo','QualityFirstheadName','QualityFirstEmailId',
  'QualityFirstPhoneNo','NPDHeadName','NPDHeadEmailId',
  'NPDHeadPhoneNo','HeadERMName','HeadERMEmailId',
  'HeadERMPhoneNo','ITHeadName','ITHeadPhoneNo','ITHeadEmailId','SavedOn','ModifiedOn','DispatchFirstName','DispatchFirstEmailId','DispatchFirstPhoneNo'];

  constructor(private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe,private activatedRouter: ActivatedRoute, public dialog: MatDialog, 
    private rpt_service:CPKDALService, private spinner: NgxSpinnerService,  private route: ActivatedRoute,) { }

   
  ngOnInit(): void {
    this.rpt_service.ContactDetail().subscribe(
      data => {
        console.log('shop', data)
        this.vendorCategorydetail = JSON.parse(data.toString())
        debugger;
        console.log('vendorCategorydetail', this.vendorCategorydetail)
      });

       // Dashboard form
       this.SupplierReport()

  }



  logout(){
    this.router.navigate(['Supplierlogin'])

  //  window.location.href='https://tradewithtvs.com/login.aspx'
     
  }

   allSelected=false;
   foods: any[] = [
    {value: '3W-0', viewValue: '3W'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
   optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
  SupplierReport() {
    debugger
  
  
    this.rpt_service.SupplierReport(this.profileForm.value.VendorId,this.profileForm.value.VendorCategory).subscribe(
      data => {

        debugger
        let ref = JSON.parse(data.toString())
        console.log('datatable', ref)
        this.dataSourceMain = new MatTableDataSource(JSON.parse(data.toString()))
     
      }
    );
  
    }

    @ViewChild('TABLE', { static: false }) TABLE: ElementRef | any;  

    Export() {  
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.TABLE.nativeElement);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'SheetJS.xlsx');

    } 

 

    printPage() {
      window.print();
    }


 

}
