import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliercontactdetailsrptComponent } from './suppliercontactdetailsrpt.component';

describe('SuppliercontactdetailsrptComponent', () => {
  let component: SuppliercontactdetailsrptComponent;
  let fixture: ComponentFixture<SuppliercontactdetailsrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliercontactdetailsrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliercontactdetailsrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
