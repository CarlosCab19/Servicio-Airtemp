import { TestBed } from '@angular/core/testing';

import { ComprobanteService } from './comprobante.service';

describe('ComprovanteService', () => {
  let service: ComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
