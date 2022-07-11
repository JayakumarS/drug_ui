import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWholesalerMasterComponent } from './delete-wholesaler-master.component';

describe('DeleteWholesalerMasterComponent', () => {
  let component: DeleteWholesalerMasterComponent;
  let fixture: ComponentFixture<DeleteWholesalerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWholesalerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWholesalerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
