import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrugManagementComponent } from './add-drug-management.component';

describe('AddDrugManagementComponent', () => {
  let component: AddDrugManagementComponent;
  let fixture: ComponentFixture<AddDrugManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrugManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrugManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
