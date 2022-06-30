import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManufactureReportComponent } from './add-manufacture-report.component';

describe('AddManufactureReportComponent', () => {
  let component: AddManufactureReportComponent;
  let fixture: ComponentFixture<AddManufactureReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManufactureReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManufactureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
