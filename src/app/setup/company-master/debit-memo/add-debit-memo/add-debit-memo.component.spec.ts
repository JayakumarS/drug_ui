import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDebitMemoComponent } from './add-debit-memo.component';

describe('AddDebitMemoComponent', () => {
  let component: AddDebitMemoComponent;
  let fixture: ComponentFixture<AddDebitMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDebitMemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDebitMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
