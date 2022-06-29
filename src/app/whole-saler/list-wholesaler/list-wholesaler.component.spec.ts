import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWholesalerComponent } from './list-wholesaler.component';

describe('ListWholesalerComponent', () => {
  let component: ListWholesalerComponent;
  let fixture: ComponentFixture<ListWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWholesalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
