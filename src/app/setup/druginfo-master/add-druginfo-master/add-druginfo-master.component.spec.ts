import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDruginfoMasterComponent } from './add-druginfo-master.component';

describe('AddDruginfoMasterComponent', () => {
  let component: AddDruginfoMasterComponent;
  let fixture: ComponentFixture<AddDruginfoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDruginfoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDruginfoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
