import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFutureDatedComponent } from './add-future-dated.component';

describe('AddFutureDatedComponent', () => {
  let component: AddFutureDatedComponent;
  let fixture: ComponentFixture<AddFutureDatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFutureDatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFutureDatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
