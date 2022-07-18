import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReturnMemoItemsComponent } from './list-return-memo-items.component';

describe('ListReturnMemoItemsComponent', () => {
  let component: ListReturnMemoItemsComponent;
  let fixture: ComponentFixture<ListReturnMemoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReturnMemoItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReturnMemoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
