import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManufacturermasterComponent } from './add-manufacturermaster.component';

describe('AddManufacturermasterComponent', () => {
  let component: AddManufacturermasterComponent;
  let fixture: ComponentFixture<AddManufacturermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManufacturermasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManufacturermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
