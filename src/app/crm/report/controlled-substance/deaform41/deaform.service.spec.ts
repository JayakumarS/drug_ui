import { TestBed } from '@angular/core/testing';

import { DeaformService } from './deaform.service';

describe('DeaformService', () => {
  let service: DeaformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeaformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
