import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingLablesComponent } from './add-shipping-lables.component';

describe('AddShippingLablesComponent', () => {
  let component: AddShippingLablesComponent;
  let fixture: ComponentFixture<AddShippingLablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShippingLablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShippingLablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
