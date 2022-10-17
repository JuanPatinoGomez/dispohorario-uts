import { TestBed } from '@angular/core/testing';

import { ModqrService } from './modqr.service';

describe('ModqrService', () => {
  let service: ModqrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModqrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
