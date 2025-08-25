import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelBooking } from './modal-cancel-booking';

describe('ModalCancelBooking', () => {
  let component: ModalCancelBooking;
  let fixture: ComponentFixture<ModalCancelBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCancelBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCancelBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
