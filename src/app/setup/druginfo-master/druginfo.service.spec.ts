import { TestBed } from '@angular/core/testing';

import { DruginfoService } from './druginfo.service';

describe('DruginfoService', () => {
  let service: DruginfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DruginfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
