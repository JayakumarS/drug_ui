import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDebitMemoComponent } from './delete-debit-memo.component';

describe('DeleteDebitMemoComponent', () => {
  let component: DeleteDebitMemoComponent;
  let fixture: ComponentFixture<DeleteDebitMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDebitMemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDebitMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
