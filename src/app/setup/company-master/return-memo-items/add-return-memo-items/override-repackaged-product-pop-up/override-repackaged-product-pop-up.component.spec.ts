import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideRepackagedProductPopUpComponent } from './override-repackaged-product-pop-up.component';

describe('OverrideRepackagedProductPopUpComponent', () => {
  let component: OverrideRepackagedProductPopUpComponent;
  let fixture: ComponentFixture<OverrideRepackagedProductPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverrideRepackagedProductPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverrideRepackagedProductPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
