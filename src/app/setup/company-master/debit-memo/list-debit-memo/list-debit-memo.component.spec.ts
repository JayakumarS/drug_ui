import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDebitMemoComponent } from './list-debit-memo.component';

describe('ListDebitMemoComponent', () => {
  let component: ListDebitMemoComponent;
  let fixture: ComponentFixture<ListDebitMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDebitMemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDebitMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
