import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFrequencyOfReturnComponent } from './add-frequency-of-return.component';

describe('AddFrequencyOfReturnComponent', () => {
  let component: AddFrequencyOfReturnComponent;
  let fixture: ComponentFixture<AddFrequencyOfReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFrequencyOfReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFrequencyOfReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
