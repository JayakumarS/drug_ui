import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangePopUpComponent } from './password-change-pop-up.component';

describe('PasswordChangePopUpComponent', () => {
  let component: PasswordChangePopUpComponent;
  let fixture: ComponentFixture<PasswordChangePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
