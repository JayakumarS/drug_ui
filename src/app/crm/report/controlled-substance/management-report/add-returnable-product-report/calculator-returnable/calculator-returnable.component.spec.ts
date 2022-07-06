import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorReturnableComponent } from './calculator-returnable.component';

describe('CalculatorReturnableComponent', () => {
  let component: CalculatorReturnableComponent;
  let fixture: ComponentFixture<CalculatorReturnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorReturnableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorReturnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
