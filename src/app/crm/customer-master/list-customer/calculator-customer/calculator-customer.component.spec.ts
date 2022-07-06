import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCustomerComponent } from './calculator-customer.component';

describe('CalculatorCustomerComponent', () => {
  let component: CalculatorCustomerComponent;
  let fixture: ComponentFixture<CalculatorCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
