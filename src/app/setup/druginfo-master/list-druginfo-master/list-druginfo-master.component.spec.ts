import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDruginfoMasterComponent } from './list-druginfo-master.component';

describe('ListDruginfoMasterComponent', () => {
  let component: ListDruginfoMasterComponent;
  let fixture: ComponentFixture<ListDruginfoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDruginfoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDruginfoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
