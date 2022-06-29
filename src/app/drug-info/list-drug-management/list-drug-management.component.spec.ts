import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDrugManagementComponent } from './list-drug-management.component';

describe('ListDrugManagementComponent', () => {
  let component: ListDrugManagementComponent;
  let fixture: ComponentFixture<ListDrugManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDrugManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDrugManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
