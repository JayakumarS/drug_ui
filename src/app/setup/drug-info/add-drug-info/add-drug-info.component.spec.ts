import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrugInfoComponent } from './add-drug-info.component';

describe('AddDrugInfoComponent', () => {
  let component: AddDrugInfoComponent;
  let fixture: ComponentFixture<AddDrugInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrugInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrugInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
