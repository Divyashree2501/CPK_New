import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CPKDALService } from '../cpkdal.service';

@Component({
  selector: 'app-supplierlogin',
  templateUrl: './supplierlogin.component.html',
  styleUrls: ['./supplierlogin.component.css']
})
export class SupplierloginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe,private activatedRouter: ActivatedRoute, public dialog: MatDialog, 
    private rpt_service:CPKDALService, private spinner: NgxSpinnerService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    VCode: new FormControl(''),
    password: new FormControl(''),
    // Plant: new FormControl(''),

  });
  
  home() {
    
    this.rpt_service.SupplierloginDO(this.profileForm.value.VCode, this.profileForm.value.password).subscribe(

      data => {
        let ref = JSON.parse(data.toString())
        console.log(ref)
        if (JSON.parse(data.toString()).length > 0) {
          this.spinner.show();

          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
          debugger
          // sessionStorage.setItem("Empno", this.profileForm.value.Empno);
          sessionStorage.setItem("VendorID", this.profileForm.value.VCode!);
          sessionStorage.setItem("VendorName", ref[0].VENDOR_NAME);
          sessionStorage.setItem("Screen1", '');
          // this.router.navigate(['home'])
        //  var FDT =  window.btoa('123')
        //  var TDT =  window.btoa('123')
        //  var Part = window.btoa('123')
        //  this.router.navigate(['dataentrymain/' + FDT + '/' + TDT + '/' + Part])
       
        this.router.navigate(["/Suppliercontactlibrary"], {
          queryParams: {
           
            vendordetail: window.btoa(this.profileForm.value.VCode!)
        
          }
        });
         
        // this.router.navigate(["/Suppliercontactlibrary"], {
        //   queryParams: {
           
        //     vendordetail: window.btoa(this.profileForm.value.VCode!)
        
        //   }
        // });
        
            
           
          }      
        
        else {
          Swal.fire({
            icon: 'error',
            text: 'You Are Not Authorized!!!'
          })
        }
      }
    )
  }


}
