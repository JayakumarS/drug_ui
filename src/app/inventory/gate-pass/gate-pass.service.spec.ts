import { TestBed } from '@angular/core/testing';

import { GatePassService } from './gate-pass.service';

describe('GatePassService', () => {
  let service: GatePassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatePassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
