import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CPKDALService } from '../cpkdal.service';


@Component({
  selector: 'app-dataentrytwo',
  templateUrl: './dataentrytwo.component.html',
  styleUrls: ['./dataentrytwo.component.css']
})
export class DataentrytwoComponent implements OnInit {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,5}$/g);
  displayedColumns: string[] = ['Position', 'VORGLFNR', 'LTXA1', 'MERKNR', 'KURZTEXT', 'LSL', 'USL', 'MASSEINHSW', 'MESSWERT1', 'MESSWERT2', 'MESSWERT3', 'MESSWERT4', 'MESSWERT5', 'MESSWERT6', 'PRT_DESC'];
  dataSourceMain: any = [];
  dataSource: any;
  btnShow: any = false
  dataSourceShow: any = false;
  LOTStatus: any;
  flagcheck: any = [];
  Supplierlist: any = []
  arry: any;
  arr: any = [];
  Frame: any;
  Part: any[] = ['N9090660']
  Val1Chk: any;

  constructor( private router: Router, private formBuilder: FormBuilder, 
    private activatedRouter: ActivatedRoute,
     public dialog: MatDialog, private rpt_service:CPKDALService, 
     private spinner: NgxSpinnerService) { }
     profileForm = new FormGroup({
      WERKS: new FormControl(''),
      MATNR: new FormControl(''),
      MAKTX: new FormControl(''),
      PASTRTERM: new FormControl(''),
      PRUEFLOS: new FormControl(''),
      DRW_ISSUE: new FormControl(''),
      DRW_REVISION: new FormControl(''),
      SUP_LINE: new FormControl(''),
      STATUS: new FormControl('')
  
    });

    ngOnInit(): void {
      this.spinner.show();
  
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
  
      console.log('Screen1', sessionStorage.getItem('Screen1'))
      var paramsSub1: any = this.activatedRouter.snapshot.params['PRUEFLOS'];
      var LotNo = window.atob(paramsSub1)
  
      var paramsSub2: any = this.activatedRouter.snapshot.params['DRW_ISSUE'];
      var DrwIssue = window.atob(paramsSub2)
      if (DrwIssue != "1") {
        this.profileForm.controls['DRW_ISSUE'].setValue(DrwIssue)
      }
  
      var paramsSub3: any = this.activatedRouter.snapshot.params['DRW_REVISION'];
      var DrwRev = window.atob(paramsSub3)
      if (DrwRev != "1") {
        this.profileForm.controls['DRW_REVISION'].setValue(DrwRev)
      }
  
      var paramsSub4: any = this.activatedRouter.snapshot.params['SUP_LINE'];
      var PrdLine = window.atob(paramsSub4)
      if (PrdLine != "1") {
        this.profileForm.controls['SUP_LINE'].setValue(PrdLine)
      }
  
  
      var paramsSub5: any = this.activatedRouter.snapshot.params['STATUS'];
      var status = window.atob(paramsSub5)
      this.profileForm.controls['STATUS'].setValue(status)
  
      this.LOTStatus = status //"Open" //status
      var LOTSts = status
      console.log('LOTStatus', status)
  
      this.GetLot(LotNo, LOTSts);
    }
  
    GoBack() {
      var paramsSub6: any = this.activatedRouter.snapshot.params['FDT'];
      var FDT = window.atob(paramsSub6)
      console.log('FDT', FDT)
      FDT = window.btoa(FDT)
  
      var paramsSub7: any = this.activatedRouter.snapshot.params['TDT'];
      var TDT = window.atob(paramsSub7)
      TDT = window.btoa(TDT)
      var Part:any = this.profileForm.value.MATNR
      Part = window.btoa(Part)
      if (FDT != '' && TDT != '' && Part != '') {
        this.router.navigate(['dataentrymain/' + FDT + '/' + TDT + '/' + Part])
      }
      else {
        this.router.navigate(['dataentrymain/' + FDT + '/' + TDT + '/' + Part])
      }
    }
  
    GetLot(LotNo: any, LOTSts: any) {
      if (LotNo != null) {
        // console.log('Plant', this.profileForm.value.Plant)
        // console.log('ModelName', this.profileForm.value.ModelName)
        this.rpt_service.GetInspectionLotDetails(LotNo).subscribe(
  
          data => {
            let ref = JSON.parse(data.toString())
            //if (JSON.parse(data.toString()).length > 0) {
            if (ref[0].MATNR.toString() != "") {
              console.log('InspectionDetails', JSON.parse(data.toString()))
              if (LOTSts == 'Open') {
                this.btnShow = true
                this.dataSourceShow = true
              }
              else {
                this.btnShow = false
                this.dataSourceShow = true
              }
  
  
              this.dataSource = JSON.parse(data.toString())
              this.dataSourceMain = new MatTableDataSource(JSON.parse(data.toString())) //To bind data to details table
  
              //this.profileForm.controls['WERKS'].setValue(JSON.parse(data.toString())[0].WERKS)
              this.profileForm.controls['MATNR'].setValue(JSON.parse(data.toString())[0].MATNR)
              this.profileForm.controls['MAKTX'].setValue(JSON.parse(data.toString())[0].MAKTX)
              this.profileForm.controls['PASTRTERM'].setValue(JSON.parse(data.toString())[0].PASTRTERM)
              this.profileForm.controls['PRUEFLOS'].setValue(JSON.parse(data.toString())[0].PRUEFLOS)
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
  
    ChangeFontColor(row: any) {
      console.log('lsl-usl', row.LSL + '-' + row.USL)
      var query1 = row.LSL;
      var query2 = row.USL;
      var query3 = row.MESSWERT1;
      if (row.LSL != '' && row.USL != '' && query3 != '') {
        var isNumeric = query1.match(this.regex);
        var isNumeric2 = query2.match(this.regex);
        console.log('isNumeric ', isNumeric);
        console.log('isNumeric2 ', isNumeric2);
        console.log('query3', query3);
        if (isNumeric >= query3 && isNumeric2 <= query3) {
          this.Val1Chk = "YES"
        }
        else {
          this.Val1Chk = "NO"
        }
      }
    }

    getClassValue(LSL: any, USL: any, MESSWERT1: any) {

      debugger;
      console.log('TDColorvalues', LSL + USL + MESSWERT1)
     
      var LSL1 = parseFloat(LSL);
      var USL1 = parseFloat(USL);
      var MESSWERT_1 = parseFloat(MESSWERT1);
  
      if (LSL1 > USL1) {
        console.log('value',"1")
  
        if (MESSWERT_1 < LSL1) { return 'css-class-red' }
  
        else { return 'css-class-yellow' }
      }
      else {
        console.log('value',"2")
        if ((LSL1 > MESSWERT_1 || USL1 < MESSWERT_1) || (LSL1 > MESSWERT_1 && USL1 < MESSWERT_1)) { return 'css-class-red' }
  
        else { return 'css-class-yellow' }
  
      }
  
     
  
  
    }

    getClassValuetwo(LSL: any, USL: any, MESSWERT2: any) {


    

      var LSL2 = parseFloat(LSL);
      var USL2 = parseFloat(USL);
      var MESSWERT_2 = parseFloat(MESSWERT2);
  
      if (LSL2 > USL2) {
        console.log('value',"1")
  
        if (MESSWERT_2 < LSL2) { return 'css-class-red' }
  
        else { return 'css-class-yellow' }
      }
      else
      {
        if ((LSL2 > MESSWERT_2 || USL2 < MESSWERT_2) || (LSL2 > MESSWERT_2 && USL2 < MESSWERT_2)) { return 'css-class-red' }
  
        else { return 'css-class-yellow' }
  
      }
  
     
  
    }
    getClassValuethree(LSL: any, USL: any, MESSWERT3: any) {
  
  
  
      var LSL3 = parseFloat(LSL);
      var USL3 = parseFloat(USL);
      var MESSWERT_3 = parseFloat(MESSWERT3);
  
      if (LSL3 > USL3) {
        console.log('value',"1")
  
        if (MESSWERT_3 < LSL3) { return 'css-class-red' }
  
        else { return 'css-class-yellow' }
      }
      else
      {
        if ((LSL3 > MESSWERT_3 || USL3 < MESSWERT_3) || (LSL3 > MESSWERT_3 && USL3 < MESSWERT_3)) { return 'css-class-red' }
  
      else { return 'css-class-yellow' }
  
      }
  
      
  
  
  
    }

    getClassValuefour(LSL: any, USL: any, MESSWERT4: any) {
  
      var LSL4 = parseFloat(LSL);
      var USL4 = parseFloat(USL);
      var MESSWERT_4 = parseFloat(MESSWERT4);
  
      if (LSL4 > USL4) {
        console.log('value',"1")
  
        if (MESSWERT_4 < LSL4) { return 'css-class-red' }
  
        else { return 'css-class-yellow' }
      }
      else
      {
        if ((LSL4 > MESSWERT_4 || USL4 < MESSWERT_4) || (LSL4 > MESSWERT_4 && USL4 < MESSWERT_4)) { return 'css-class-red' }
  
      else { return 'css-class-yellow' }
  
      }
   
  
    }

    getClassValuefive(LSL: any, USL: any, MESSWERT5: any) {
  
      var LSL5 = parseFloat(LSL);
      var USL5= parseFloat(USL);
      var MESSWERT_5 = parseFloat(MESSWERT5);
  
      if (LSL5 > USL5) {
        console.log('value',"1")
  
        if (MESSWERT_5 < LSL5) { return 'css-class-red' }
  
        else { return 'css-class-yellow' }
      }
      else
      {
        if ((LSL5 > MESSWERT_5 || USL5 < MESSWERT_5) || (LSL5 > MESSWERT_5 && USL5 < MESSWERT_5)) { return 'css-class-red' }
  
      else { return 'css-class-yellow' }
  
      }
   
  
    }

    getClassValuesix(LSL: any, USL: any, MESSWERT6: any) {
  
      var LSL6 = parseFloat(LSL);
      var USL6= parseFloat(USL);
      var MESSWERT_6 = parseFloat(MESSWERT6);
  
      if (LSL6 > USL6) {
        console.log('value',"1")
  
        if (MESSWERT_6 < LSL6) { return 'css-class-red' }
  
        else { return 'css-class-yellow' }
      }
      else
      {
        if ((LSL6 > MESSWERT_6 || USL6 < MESSWERT_6) || (LSL6 > MESSWERT_6 && USL6 < MESSWERT_6)) { return 'css-class-red' }
  
      else { return 'css-class-yellow' }
  
      }
   
  
    }
  
    btnSave() {
      console.log(sessionStorage.getItem('VendorID'))
      if (sessionStorage.getItem('VendorID')?.trim() != null) {
        //if (this.profileForm.value.VendorCode != '' && this.profileForm.value.VendorName != '' && this.profileForm.value.TRUCK_NO != '' && this.profileForm.value.DRIVER_NAME != '' && this.profileForm.value.LICENSE_NO != '' && this.profileForm.value.VEHICLE_TYPE != '' && this.profileForm.value.PLANT != '') {
  
        this.arr = []
        this.arr = this.dataSourceMain["filteredData"]
  
        this.flagcheck = []
  
        for (var i = 0, len = this.arr.length; i < len; i++) {
          console.log('Val1,Val2', this.arr[i].MESSWERT1, this.arr[i].MESSWERT2);
          var val1 = this.arr[i].MESSWERT1;
          var val2 = this.arr[i].MESSWERT2;
          if (val1 == '' || val2 == '') {
            this.flagcheck = '1'
          }
          else {
            //this.flag = '' 
          }
        }
  
        console.log('flagcheck', this.flagcheck)
        if (typeof this.flagcheck !== 'undefined' && this.flagcheck.length > 0) {
          Swal.fire({
            icon: 'error',
            text: 'Value 1 and Value 2 are Mandatory Field!!!'
          })
        }
        else {
          this.arr.forEach((element: any) => {
  
            element.MATNR = this.profileForm.value.MATNR
            element.Status = "S"
  
          });
          console.log('Savedata', JSON.parse(JSON.stringify(this.arr)))
          this.rpt_service.SaveInspectionLotDetails(JSON.parse(JSON.stringify(this.arr))).subscribe(
  
            data => {
              let ref = JSON.parse(data.toString())
              console.log(ref)
              if (ref[0].MsgText.toString() != "") {
                Swal.fire({
                  icon: 'success',
                  text: ref[0].MsgText.toString()
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
        //}
        // }
        // else {
        //   Swal.fire({
        //     icon: 'error',
        //     text: 'Fill all the *Mandtory Fields !!!'
        //   })
        // }
  
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
  
    btnSubmit() {
      console.log(sessionStorage.getItem('VendorID'))
      if (sessionStorage.getItem('VendorID')?.trim() != null) {
        //if (this.profileForm.value.VendorCode != '' && this.profileForm.value.VendorName != '' && this.profileForm.value.TRUCK_NO != '' && this.profileForm.value.DRIVER_NAME != '' && this.profileForm.value.LICENSE_NO != '' && this.profileForm.value.VEHICLE_TYPE != '' && this.profileForm.value.PLANT != '') {
  
        this.arr = []
        this.arr = this.dataSourceMain["filteredData"]
  
        this.flagcheck = []
  
        for (var i = 0, len = this.arr.length; i < len; i++) {
          console.log('Val1,Val2', this.arr[i].MESSWERT1, this.arr[i].MESSWERT2);
          var val1 = this.arr[i].MESSWERT1;
          var val2 = this.arr[i].MESSWERT2;
          if (val1 == '' || val2 == '') {
            this.flagcheck = '1'
          }
          else {
            //this.flag = '' 
          }
        }
  
        console.log('flagcheck', this.flagcheck)
        if (typeof this.flagcheck !== 'undefined' && this.flagcheck.length > 0) {
          Swal.fire({
            icon: 'error',
            text: 'Value 1 and Value 2 are Mandatory Field!!!'
          })
        }
        else {
          this.arr.forEach((element: any) => {
  
            element.MATNR = this.profileForm.value.MATNR
            element.Status = "F"
  
          });
          console.log('Savedata', JSON.parse(JSON.stringify(this.arr)))
          this.rpt_service.SaveInspectionLotDetails(JSON.parse(JSON.stringify(this.arr))).subscribe(
  
            data => {
              let ref = JSON.parse(data.toString())
              console.log(ref)
              if (ref[0].MsgText.toString() != "") {
                Swal.fire({
                  icon: 'success',
                  text: ref[0].MsgText.toString()
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
        //}
        // }
        // else {
        //   Swal.fire({
        //     icon: 'error',
        //     text: 'Fill all the *Mandtory Fields !!!'
        //   })
        // }
  
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

    DataEntry1() {
      //this.router.navigate(['dataentrymain'])
      var FDT =  window.btoa('123')
      var TDT =  window.btoa('123')
      var Part = window.btoa('123')
      this.router.navigate(['dataentrymain/' + FDT + '/' + TDT + '/' + Part])
    }
}
