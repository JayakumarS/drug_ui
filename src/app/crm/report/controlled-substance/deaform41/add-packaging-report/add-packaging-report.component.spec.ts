import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackagingReportComponent } from './add-packaging-report.component';

describe('AddPackagingReportComponent', () => {
  let component: AddPackagingReportComponent;
  let fixture: ComponentFixture<AddPackagingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPackagingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackagingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
