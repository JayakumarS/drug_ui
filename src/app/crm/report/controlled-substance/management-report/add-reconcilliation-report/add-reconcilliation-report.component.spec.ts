import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReconcilliationReportComponent } from './add-reconcilliation-report.component';

describe('AddReconcilliationReportComponent', () => {
  let component: AddReconcilliationReportComponent;
  let fixture: ComponentFixture<AddReconcilliationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReconcilliationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReconcilliationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
