import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CPKDALService {
  constructor(private http: HttpClient) { }

   readonly url = "https://localhost:44353/api/" 
  // readonly url = "http://10.121.57.28:94/api/" //Local IIS DEV
  // readonly url = "http://10.121.57.28:86/api/" //Local IIS QAS
  //readonly url= "https://teamhr.tvsmotor.co.in/FQI/api/" //PRD TEAM HR Server Link

 // readonly url= "https://tradewithtvs.com/CPK_API/api/" //PRD Tradewithtvs Server Link
 
  loginDO(Empno: any, password: any) {
    let option = {
      Empno: Empno,
      password: password
    }
    return this.http.post(this.url + "Login", option)
    //return this.http.post("CPK_API/api/Login", option)
  }

  VloginDO(VCode: any, password: any) {
    debugger
    let option = {
      VCode: VCode,
      password: password
    }
    // console.log('option',option)
    return this.http.post(this.url + "VCPKLogin", option)
    //return this.http.post("CPK_API/api/VCPKLogin", option)
  }

  plant() {
    let option = {

    }
    console.log('option', option)
    return this.http.post(this.url + "Plant", option)
  }

  GetCPKPartMaster(VendorID: any) {
    let option = {
      Supplier: VendorID,
    }
    console.log('option', option)
    return this.http.post(this.url + "GetCPKPartMaster", option)
  }





  GetCPKPartMasterNew(VendorID: any) {
    let option = {
      Supplier: VendorID,
    }
    console.log('option', option)
    return this.http.post(this.url + "GetCPKPartMasterNew", option)
  }

  GetLotNo(VendorID: any, PartNo: any, datefrom: any, dateto: any) {
    let option = {
      Supplier: VendorID,
      PartList: PartNo,
      FromDate: datefrom,
      ToDate: dateto
    }
    console.log('option', option)
    return this.http.post(this.url + "GetLotNo", option)
  }

  GetInspectionLotDetails(LotNo: any) {
    let option = {
      InspectionLOTNo : LotNo
    }
    console.log('option', option)
    return this.http.post(this.url + "GetInspectionLotDetails", option)
  }

  SaveInspectionLotPrdPlan(option: any) {

    console.log('option', option)
    return this.http.post(this.url + "SaveInspectionLotPrdPlan", option)
    //return this.http.post("EVStockAPI/api/SaveEVStockData", option)
  }

  SaveInspectionLotDetails(option: any) {

    console.log('option', option)
    return this.http.post(this.url + "SaveInspectionLotDetails", option)
    //return this.http.post("EVStockAPI/api/SaveEVStockData", option)
  }

  GetDailyReport(VendorID: any, PartNo: any, datefrom: any, dateto: any) {
    let option = {
      Supplier: VendorID,
      PartList: PartNo,
      FromDate: datefrom,
      ToDate: dateto
    }
    console.log('option', option)
    return this.http.post(this.url + "GetDailyReport", option)
  }

  GetMonthlyReport(VendorID: any, PartNo: any, datefrom: any, dateto: any) {
    let option = {
      Supplier: VendorID,
      PartList: PartNo,
      FromDate: datefrom,
      ToDate: dateto
    }
    console.log('option', option)
    return this.http.post(this.url + "GetMonthlyReport", option)
  }
  VendorDetail(VendorId: any){
    let option = {
      VendorId: VendorId,
     
    }
    return this.http.post(this.url + "Vendordetail", option)
  }

  ContactDetail(){
    let option = {
    
     
    }
    return this.http.post(this.url + "VendorCategorydetail", option)

  }
  SupplierReport(VendorId: any,VendorCategory:any){
    let option = {
      VendorId: VendorId,
      VendorCategory:VendorCategory
    }
    return this.http.post(this.url + "VendorCategorydetailReport", option)


  }

  SaveVendorDetail(option: any) {

    console.log('option', option)
    return this.http.post(this.url + "SaveSupplierContactLibrary", option)
    //return this.http.post("EVStockAPI/api/SaveEVStockData", option)
  }

  SupplierloginDO(VCode: any, password: any) {
    debugger
    let option = {
      VCode: VCode,
      password: password
    }
    // console.log('option',option)
    return this.http.post(this.url + "SupplierLogin", option)
    //return this.http.post("CPK_API/api/VCPKLogin", option)
  }

}