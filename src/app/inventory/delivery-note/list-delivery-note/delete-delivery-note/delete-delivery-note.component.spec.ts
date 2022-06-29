import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeliveryNoteComponent } from './delete-delivery-note.component';

describe('DeleteDeliveryNoteComponent', () => {
  let component: DeleteDeliveryNoteComponent;
  let fixture: ComponentFixture<DeleteDeliveryNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDeliveryNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeliveryNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
