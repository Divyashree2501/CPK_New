import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataentrytwoComponent } from './dataentrytwo.component';

describe('DataentrytwoComponent', () => {
  let component: DataentrytwoComponent;
  let fixture: ComponentFixture<DataentrytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataentrytwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataentrytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
