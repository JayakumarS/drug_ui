import { TestBed } from '@angular/core/testing';

import { ReturnMemoItemsService } from './return-memo-items.service';

describe('ReturnMemoItemsService', () => {
  let service: ReturnMemoItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnMemoItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
