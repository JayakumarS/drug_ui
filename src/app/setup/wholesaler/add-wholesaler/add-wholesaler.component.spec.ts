import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWholesalerComponent } from './add-wholesaler.component';

describe('AddWholesalerComponent', () => {
  let component: AddWholesalerComponent;
  let fixture: ComponentFixture<AddWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWholesalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
