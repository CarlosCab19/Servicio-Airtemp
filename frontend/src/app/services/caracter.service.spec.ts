import { TestBed } from '@angular/core/testing';

import { CaracterService } from './caracter.service';

describe('CaracterService', () => {
  let service: CaracterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
