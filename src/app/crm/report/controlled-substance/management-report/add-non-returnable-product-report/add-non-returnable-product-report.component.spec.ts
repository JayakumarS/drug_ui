import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNonReturnableProductReportComponent } from './add-non-returnable-product-report.component';

describe('AddNonReturnableProductReportComponent', () => {
  let component: AddNonReturnableProductReportComponent;
  let fixture: ComponentFixture<AddNonReturnableProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNonReturnableProductReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNonReturnableProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
