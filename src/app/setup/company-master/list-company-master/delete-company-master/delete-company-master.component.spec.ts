import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompanyMasterComponent } from './delete-company-master.component';

describe('DeleteCompanyMasterComponent', () => {
  let component: DeleteCompanyMasterComponent;
  let fixture: ComponentFixture<DeleteCompanyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCompanyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompanyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
