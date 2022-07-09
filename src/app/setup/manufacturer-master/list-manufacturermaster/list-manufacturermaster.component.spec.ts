import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManufacturermasterComponent } from './list-manufacturermaster.component';

describe('ListManufacturermasterComponent', () => {
  let component: ListManufacturermasterComponent;
  let fixture: ComponentFixture<ListManufacturermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListManufacturermasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManufacturermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
