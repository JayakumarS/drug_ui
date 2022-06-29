import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnableProductReportComponent } from './add-returnable-product-report.component';

describe('AddReturnableProductReportComponent', () => {
  let component: AddReturnableProductReportComponent;
  let fixture: ComponentFixture<AddReturnableProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReturnableProductReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReturnableProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
