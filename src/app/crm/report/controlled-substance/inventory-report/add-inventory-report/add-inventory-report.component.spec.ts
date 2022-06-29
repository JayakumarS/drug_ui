import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryReportComponent } from './add-inventory-report.component';

describe('AddInventoryReportComponent', () => {
  let component: AddInventoryReportComponent;
  let fixture: ComponentFixture<AddInventoryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInventoryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInventoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
