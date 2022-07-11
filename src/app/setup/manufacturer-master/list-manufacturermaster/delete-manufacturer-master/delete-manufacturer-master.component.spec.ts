import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManufacturerMasterComponent } from './delete-manufacturer-master.component';

describe('DeleteManufacturerMasterComponent', () => {
  let component: DeleteManufacturerMasterComponent;
  let fixture: ComponentFixture<DeleteManufacturerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteManufacturerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteManufacturerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
