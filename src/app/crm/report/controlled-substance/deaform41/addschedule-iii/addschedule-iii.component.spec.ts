import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscheduleIIIComponent } from './addschedule-iii.component';

describe('AddscheduleIIIComponent', () => {
  let component: AddscheduleIIIComponent;
  let fixture: ComponentFixture<AddscheduleIIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddscheduleIIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddscheduleIIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
