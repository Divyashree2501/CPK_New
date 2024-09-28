import { TestBed } from '@angular/core/testing';
import { CPKDALService } from './cpkdal.service';



describe('CopdatabaseService', () => {
  let service: CPKDALService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CPKDALService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
