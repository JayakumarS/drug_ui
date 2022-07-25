import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRolePopUpComponent } from './change-role-pop-up.component';

describe('ChangeRolePopUpComponent', () => {
  let component: ChangeRolePopUpComponent;
  let fixture: ComponentFixture<ChangeRolePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRolePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRolePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
