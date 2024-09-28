import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CPKDALService } from '../cpkdal.service';

@Component({
  selector: 'app-suppliercontactlibrary',
  templateUrl: './suppliercontactlibrary.component.html',
  styleUrls: ['./suppliercontactlibrary.component.css']
})
export class SuppliercontactlibraryComponent implements OnInit {

  public VendorDetail: any = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, private activatedRouter: ActivatedRoute, public dialog: MatDialog,
    private rpt_service: CPKDALService, private spinner: NgxSpinnerService, private route: ActivatedRoute,
  ) { }
  profileForm = new FormGroup({
    VendorId: new FormControl(''),
    VendorName: new FormControl(''),
    VendorCategory: new FormControl(''),
    ProductionHouse: new FormControl(''),
    VendorAddress: new FormControl(''),
    PinCode: new FormControl(''),
    LandlinePhoneNo: new FormControl(''),
    VCIPAddress: new FormControl(''),
    SupplierCEOName: new FormControl(''),
    SupplierCEOEmailId: new FormControl(''),
    SupplierCEOPhoneNo: new FormControl(''),
    BusinessheadName: new FormControl(''),
    BusinessheadEmailId: new FormControl(''),
    BusinessheadPhoneNo: new FormControl(''),
    PlantheadName: new FormControl(''),
    PlantheadEmailId: new FormControl(''),
    PlantheadPhoneNo: new FormControl(''),
    QualityheadName: new FormControl(''),
    QualityheadEmailId: new FormControl(''),
    QualityheadPhoneNo: new FormControl(''),
    MarketingFirstName: new FormControl(''),
    MarketingFirstEmailId: new FormControl(''),
    MarketingFirstPhoneNo: new FormControl(''),
    FinanceFirstName: new FormControl(''),
    FinanceFirstEmailId: new FormControl(''),
    FinanceFirstPhoneNo: new FormControl(''),
    DispatchFirstName: new FormControl(''),
    DispatchFirstEmailId: new FormControl(''),
    DispatchFirstPhoneNo: new FormControl(''),
    QualityFirstheadName: new FormControl(''),
    QualityFirstEmailId: new FormControl(''),
    QualityFirstPhoneNo: new FormControl(''),
    NPDHeadName: new FormControl(''),
    NPDHeadEmailId: new FormControl(''),
    NPDHeadPhoneNo: new FormControl(''),
    HeadERMName: new FormControl(''),
    HeadERMEmailId: new FormControl(''),
    HeadERMPhoneNo: new FormControl(''),
    ITHeadName: new FormControl(''),
    ITHeadEmailId: new FormControl(''),
    ITHeadPhoneNo: new FormControl(''),
    ModifiedDate: new FormControl(''),



  });

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.profileForm.controls['VendorId'].setValue(window.atob(params['vendordetail']))

        sessionStorage.setItem("VendorID", window.atob(params['vendordetail']));
        console.log('sessionDetails', sessionStorage.getItem('VendorID')?.trim())
    })
    this.GetVendordetail()
  }

  emailValidator(control: { value: string; }) {
    if (control.value) {
      const matches = control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
      return matches ? null : { 'invalidEmail': true };
    } else {
      return null;
    }
  }

  GetVendordetail() {
    this.rpt_service.VendorDetail(this.profileForm.value.VendorId).subscribe(
      data => {
        console.log('Details', JSON.parse(data.toString()))
        this.VendorDetail = JSON.parse(data.toString())
        this.profileForm.controls['VendorId'].setValue(this.profileForm.value.VendorId!)
        this.profileForm.controls['VendorName'].setValue(this.VendorDetail[0].VendorName)
        this.profileForm.controls['VendorCategory'].setValue(this.VendorDetail[0].VendorCategory)


        this.profileForm.controls['ProductionHouse'].setValue(this.VendorDetail[0].ProductionHouse)
        this.profileForm.controls['VendorAddress'].setValue(this.VendorDetail[0].VendorAddress)
        this.profileForm.controls['PinCode'].setValue(this.VendorDetail[0].PinCode)
        this.profileForm.controls['LandlinePhoneNo'].setValue(this.VendorDetail[0].LandlinePhoneNo)
        this.profileForm.controls['VCIPAddress'].setValue(this.VendorDetail[0].VCIPAddress)


        this.profileForm.controls['SupplierCEOName'].setValue(this.VendorDetail[0].SupplierCEOName)
        this.profileForm.controls['SupplierCEOEmailId'].setValue(this.VendorDetail[0].SupplierCEOEmailId)
        this.profileForm.controls['SupplierCEOPhoneNo'].setValue(this.VendorDetail[0].SupplierCEOPhoneNo)

        this.profileForm.controls['BusinessheadName'].setValue(this.VendorDetail[0].BusinessheadName)
        this.profileForm.controls['BusinessheadEmailId'].setValue(this.VendorDetail[0].BusinessheadEmailId)
        this.profileForm.controls['BusinessheadPhoneNo'].setValue(this.VendorDetail[0].BusinessheadPhoneNo)

        this.profileForm.controls['PlantheadName'].setValue(this.VendorDetail[0].PlantheadName)
        this.profileForm.controls['PlantheadEmailId'].setValue(this.VendorDetail[0].PlantheadEmailId)
        this.profileForm.controls['PlantheadPhoneNo'].setValue(this.VendorDetail[0].PlantheadPhoneNo)

        this.profileForm.controls['QualityheadName'].setValue(this.VendorDetail[0].QualityheadName)
        this.profileForm.controls['QualityheadEmailId'].setValue(this.VendorDetail[0].QualityheadEmailId)
        this.profileForm.controls['QualityheadPhoneNo'].setValue(this.VendorDetail[0].QualityheadPhoneNo)

        this.profileForm.controls['MarketingFirstName'].setValue(this.VendorDetail[0].MarketingFirstName)
        this.profileForm.controls['MarketingFirstEmailId'].setValue(this.VendorDetail[0].MarketingFirstEmailId)
        this.profileForm.controls['MarketingFirstPhoneNo'].setValue(this.VendorDetail[0].MarketingFirstPhoneNo)

        this.profileForm.controls['FinanceFirstName'].setValue(this.VendorDetail[0].FinanceFirstName)
        this.profileForm.controls['FinanceFirstEmailId'].setValue(this.VendorDetail[0].FinanceFirstEmailId)
        this.profileForm.controls['FinanceFirstPhoneNo'].setValue(this.VendorDetail[0].FinanceFirstPhoneNo)

        this.profileForm.controls['DispatchFirstName'].setValue(this.VendorDetail[0].DispatchFirstName)
        this.profileForm.controls['DispatchFirstEmailId'].setValue(this.VendorDetail[0].DispatchFirstEmailId)
        this.profileForm.controls['DispatchFirstPhoneNo'].setValue(this.VendorDetail[0].DispatchFirstPhoneNo)


        this.profileForm.controls['QualityFirstheadName'].setValue(this.VendorDetail[0].QualityFirstheadName)
        this.profileForm.controls['QualityFirstEmailId'].setValue(this.VendorDetail[0].QualityFirstEmailId)
        this.profileForm.controls['QualityFirstPhoneNo'].setValue(this.VendorDetail[0].QualityFirstPhoneNo)

        this.profileForm.controls['HeadERMName'].setValue(this.VendorDetail[0].HeadERMName)
        this.profileForm.controls['HeadERMEmailId'].setValue(this.VendorDetail[0].HeadERMEmailId)
        this.profileForm.controls['HeadERMPhoneNo'].setValue(this.VendorDetail[0].HeadERMPhoneNo)



        this.profileForm.controls['NPDHeadName'].setValue(this.VendorDetail[0].NPDHeadName)
        this.profileForm.controls['NPDHeadEmailId'].setValue(this.VendorDetail[0].NPDHeadEmailId)
        this.profileForm.controls['NPDHeadPhoneNo'].setValue(this.VendorDetail[0].NPDHeadPhoneNo)


        this.profileForm.controls['ITHeadName'].setValue(this.VendorDetail[0].ITHeadName)
        this.profileForm.controls['ITHeadEmailId'].setValue(this.VendorDetail[0].ITHeadEmailId)
        this.profileForm.controls['ITHeadPhoneNo'].setValue(this.VendorDetail[0].ITHeadPhoneNo)

        if (this.VendorDetail[0].ModifiedOn != "") {
          this.profileForm.controls['ModifiedDate'].setValue(this.VendorDetail[0].ModifiedOn)
        }
        else {
          this.profileForm.controls['ModifiedDate'].setValue(this.VendorDetail[0].SavedOn)
        }


      });

  }


  btnSubmit() {
    if (sessionStorage.getItem('VendorID')?.trim() != null) {
      if (this.profileForm.value.VendorId != '' && this.profileForm.value.VendorName && this.profileForm.value.VendorCategory && this.profileForm.value.ProductionHouse && this.profileForm.value.VendorAddress && this.profileForm.value.PinCode && this.profileForm.value.LandlinePhoneNo && this.profileForm.value.VCIPAddress
        && this.profileForm.value.SupplierCEOName && this.profileForm.value.SupplierCEOEmailId && this.profileForm.value.SupplierCEOPhoneNo
        && this.profileForm.value.BusinessheadName && this.profileForm.value.BusinessheadEmailId && this.profileForm.value.BusinessheadPhoneNo
        && this.profileForm.value.PlantheadName && this.profileForm.value.PlantheadEmailId && this.profileForm.value.PlantheadPhoneNo
        && this.profileForm.value.QualityheadName && this.profileForm.value.QualityheadEmailId && this.profileForm.value.QualityheadPhoneNo
        && this.profileForm.value.MarketingFirstName && this.profileForm.value.MarketingFirstEmailId && this.profileForm.value.MarketingFirstPhoneNo
        && this.profileForm.value.FinanceFirstName && this.profileForm.value.FinanceFirstEmailId && this.profileForm.value.FinanceFirstPhoneNo
        && this.profileForm.value.DispatchFirstName && this.profileForm.value.DispatchFirstEmailId && this.profileForm.value.DispatchFirstPhoneNo
        && this.profileForm.value.QualityFirstheadName && this.profileForm.value.QualityFirstEmailId && this.profileForm.value.QualityFirstPhoneNo
        && this.profileForm.value.HeadERMName && this.profileForm.value.HeadERMEmailId && this.profileForm.value.HeadERMPhoneNo
        && this.profileForm.value.NPDHeadName && this.profileForm.value.NPDHeadEmailId && this.profileForm.value.NPDHeadPhoneNo
        && this.profileForm.value.ITHeadName && this.profileForm.value.ITHeadEmailId && this.profileForm.value.ITHeadPhoneNo
      ) {

        this.rpt_service.SaveVendorDetail(this.profileForm.value).subscribe(
          data => {
            let ref = JSON.parse(data.toString())
            console.log(ref)
            // if (JSON.parse(data.toString()).length > 0)

            if (ref == "1") {
              Swal.fire({
                icon: 'success',
                text: 'Saved Successfully!!'
              })
            }
            else {
              Swal.fire({
                icon: 'error',
                text: ' Vendor  not be saved !!!'
              })
            }
            setTimeout(() => {
              this.spinner.hide();
            }, 2000);
          })



      }
      else {
        Swal.fire({
          icon: 'error',
          text: 'Fill all Mandatory Fields!!!'
        })
        this.router.navigate(['Login'])
        this.spinner.show();
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        text: 'Session Expired!!!'
      })
      this.router.navigate(['Login'])
      this.spinner.show();
    }
  }


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

      Swal.fire({
        icon: 'error',
        text: 'Please enter only Numbers !'
      })

      return false;
    }
    return true;

  }
  logout() {
    this.router.navigate(['Supplierlogin'])

    //  window.location.href='https://tradewithtvs.com/login.aspx'

  }


}



