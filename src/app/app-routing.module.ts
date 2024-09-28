import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyreportComponent } from './dailyreport/dailyreport.component';
import { DataentrymainComponent } from './dataentrymain/dataentrymain.component';
import { DataentrytwoComponent } from './dataentrytwo/dataentrytwo.component';
import { HomeComponent } from './home/home.component';
import { MonthlyreportComponent } from './monthlyreport/monthlyreport.component';
import { SuppliercontactlibraryComponent } from './suppliercontactlibrary/suppliercontactlibrary.component';
import { SupplierloginComponent } from './supplierlogin/supplierlogin.component';
import { VloginComponent } from './vlogin/vlogin.component';
import { SuppliercontactdetailsrptComponent } from './suppliercontactdetailsrpt/suppliercontactdetailsrpt.component';

const routes: Routes = [
  {
    path: 'vlogin',
    component:VloginComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'dailyreport',
    component: DailyreportComponent
  },
  {
    path: 'dataentrytwo/:PRUEFLOS/:DRW_ISSUE/:DRW_REVISION/:SUP_LINE/:STATUS/:FDT/:TDT',
    component: DataentrytwoComponent
  },
  {
    path: 'dataentrymain/:FDT/:TDT/:Part',
    component: DataentrymainComponent
  },
  {
    path: 'monthlyreport',
    component: MonthlyreportComponent
  },
  {
    path: 'Suppliercontactlibrary',
    component:SuppliercontactlibraryComponent 
  },
  {
    path: 'Supplierlogin',
    component:SupplierloginComponent 
  },
  {
    path: 'Supplierlreport',
    component:SuppliercontactdetailsrptComponent 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
