import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscheduleIIComponent } from './addschedule-ii.component';

describe('AddscheduleIIComponent', () => {
  let component: AddscheduleIIComponent;
  let fixture: ComponentFixture<AddscheduleIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddscheduleIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddscheduleIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
