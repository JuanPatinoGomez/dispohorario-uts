import { TestBed } from '@angular/core/testing';

import { BarraNavService } from './barra-nav.service';

describe('BarraNavService', () => {
  let service: BarraNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarraNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
