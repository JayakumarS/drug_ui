import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnMemoCalculatorComponent } from './return-memo-calculator.component';

describe('ReturnMemoCalculatorComponent', () => {
  let component: ReturnMemoCalculatorComponent;
  let fixture: ComponentFixture<ReturnMemoCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnMemoCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnMemoCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
