import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataentrymainComponent } from './dataentrymain/dataentrymain.component';
import { DataentrytwoComponent } from './dataentrytwo/dataentrytwo.component';
import { DailyreportComponent } from './dailyreport/dailyreport.component';
import { MonthlyreportComponent } from './monthlyreport/monthlyreport.component';
import { VloginComponent } from './vlogin/vlogin.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeComponent } from './home/home.component';
import { SuppliercontactlibraryComponent } from './suppliercontactlibrary/suppliercontactlibrary.component';
import { SupplierloginComponent } from './supplierlogin/supplierlogin.component';
import { SuppliercontactdetailsrptComponent } from './suppliercontactdetailsrpt/suppliercontactdetailsrpt.component';
import {  MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    DataentrymainComponent,
    DataentrytwoComponent,
    DailyreportComponent,
    MonthlyreportComponent,
    VloginComponent,
    HomeComponent,
    SuppliercontactlibraryComponent,
    SupplierloginComponent,
    SuppliercontactdetailsrptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    DatePipe,
   FontAwesomeModule,
   NgMultiSelectDropDownModule,
   MatCheckboxModule
    
      
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  


 }
