import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataentrymainComponent } from './dataentrymain.component';

describe('DataentrymainComponent', () => {
  let component: DataentrymainComponent;
  let fixture: ComponentFixture<DataentrymainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataentrymainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataentrymainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
