import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDEAForm41Component } from './add-deaform41.component';

describe('AddDEAForm41Component', () => {
  let component: AddDEAForm41Component;
  let fixture: ComponentFixture<AddDEAForm41Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDEAForm41Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDEAForm41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
