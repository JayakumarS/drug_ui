import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDrugInfoMasterComponent } from './delete-drug-info-master.component';

describe('DeleteDrugInfoMasterComponent', () => {
  let component: DeleteDrugInfoMasterComponent;
  let fixture: ComponentFixture<DeleteDrugInfoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDrugInfoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDrugInfoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
