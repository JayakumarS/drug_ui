import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackingSlipComponent } from './add-packing-slip.component';

describe('AddPackingSlipComponent', () => {
  let component: AddPackingSlipComponent;
  let fixture: ComponentFixture<AddPackingSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPackingSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
