import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturePopupComponent } from './manufacture-popup.component';

describe('ManufacturePopupComponent', () => {
  let component: ManufacturePopupComponent;
  let fixture: ComponentFixture<ManufacturePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
