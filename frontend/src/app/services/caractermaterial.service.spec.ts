import { TestBed } from '@angular/core/testing';

import { CaractermaterialService } from './caractermaterial.service';

describe('CaractermaterialService', () => {
  let service: CaractermaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaractermaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
