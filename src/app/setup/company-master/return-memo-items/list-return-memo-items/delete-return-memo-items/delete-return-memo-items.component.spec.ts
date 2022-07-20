import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReturnMemoItemsComponent } from './delete-return-memo-items.component';

describe('DeleteReturnMemoItemsComponent', () => {
  let component: DeleteReturnMemoItemsComponent;
  let fixture: ComponentFixture<DeleteReturnMemoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReturnMemoItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReturnMemoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
