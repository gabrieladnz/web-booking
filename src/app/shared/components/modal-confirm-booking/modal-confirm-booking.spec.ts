import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmBooking } from './modal-confirm-booking';

describe('ModalConfirmBooking', () => {
  let component: ModalConfirmBooking;
  let fixture: ComponentFixture<ModalConfirmBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
