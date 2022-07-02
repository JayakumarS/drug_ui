import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListFilesComponent } from './customer-list-files.component';

describe('CustomerListFilesComponent', () => {
  let component: CustomerListFilesComponent;
  let fixture: ComponentFixture<CustomerListFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
