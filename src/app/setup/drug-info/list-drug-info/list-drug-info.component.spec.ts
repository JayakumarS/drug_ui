import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDrugInfoComponent } from './list-drug-info.component';

describe('ListDrugInfoComponent', () => {
  let component: ListDrugInfoComponent;
  let fixture: ComponentFixture<ListDrugInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDrugInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDrugInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
