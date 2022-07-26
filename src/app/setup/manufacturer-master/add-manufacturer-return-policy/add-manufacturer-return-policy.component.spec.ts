import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManufacturerReturnPolicyComponent } from './add-manufacturer-return-policy.component';

describe('AddManufacturerReturnPolicyComponent', () => {
  let component: AddManufacturerReturnPolicyComponent;
  let fixture: ComponentFixture<AddManufacturerReturnPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManufacturerReturnPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManufacturerReturnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
