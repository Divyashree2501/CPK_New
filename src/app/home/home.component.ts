import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  GoLogin() {
    sessionStorage.clear();
    this.router.navigate(['vlogin'])
  }

  DataEntry1() {
    //this.router.navigate(['dataentrymain'])
    var FDT =  window.btoa('123')
    var TDT =  window.btoa('123')
    var Part = window.btoa('123')
    this.router.navigate(['dataentrymain/' + FDT + '/' + TDT + '/' + Part])
  }
  DataEntry2() {
    this.router.navigate(['dataentrymain'])
  }
  MonthlyReport() {
    this.router.navigate(['monthlyreport'])
  }
  DailyReport() {
    this.router.navigate(['dailyreport'])
  }
}
