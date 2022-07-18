import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnMemoItemsComponent } from './add-return-memo-items.component';

describe('AddReturnMemoItemsComponent', () => {
  let component: AddReturnMemoItemsComponent;
  let fixture: ComponentFixture<AddReturnMemoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReturnMemoItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReturnMemoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
