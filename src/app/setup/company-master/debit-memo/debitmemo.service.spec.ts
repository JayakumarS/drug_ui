import { TestBed } from '@angular/core/testing';

import { DebitmemoService } from './debitmemo.service';

describe('DebitmemoService', () => {
  let service: DebitmemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitmemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
