import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliercontactlibraryComponent } from './suppliercontactlibrary.component';

describe('SuppliercontactlibraryComponent', () => {
  let component: SuppliercontactlibraryComponent;
  let fixture: ComponentFixture<SuppliercontactlibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliercontactlibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliercontactlibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
