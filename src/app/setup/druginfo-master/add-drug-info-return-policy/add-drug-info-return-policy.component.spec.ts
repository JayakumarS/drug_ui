import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrugInfoReturnPolicyComponent } from './add-drug-info-return-policy.component';

describe('AddDrugInfoReturnPolicyComponent', () => {
  let component: AddDrugInfoReturnPolicyComponent;
  let fixture: ComponentFixture<AddDrugInfoReturnPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrugInfoReturnPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrugInfoReturnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
