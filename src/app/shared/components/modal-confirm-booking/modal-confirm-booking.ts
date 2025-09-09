import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hotel } from '../../../core/services/hotels/hotels.interface';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking/booking.service';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { BookingCreateRequest } from '../../../core/services/booking/booking.interface';

@Component({
  selector: 'app-modal-confirm-booking',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './modal-confirm-booking.html',
  styleUrl: './modal-confirm-booking.scss'
})
export class ModalConfirmBooking implements OnInit {
  public currentStep: 'booking' | 'payment' = 'booking';
  public bookingForm!: FormGroup;
  public paymentForm!: FormGroup;
  public hotel: Hotel;
  public isConfirming = false;
  public isPaying = false;

  private confirmedBookingId: string | null = null;
  private confirmedTotal!: number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalConfirmBooking>,
    @Inject(MAT_DIALOG_DATA) public data: { hotel: Hotel },
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private cdref: ChangeDetectorRef
  ) {
    this.hotel = data.hotel;
  }

  public ngOnInit(): void {
    this.initBookingForm();
    this.initPaymentForm();
  }

  private initBookingForm(): void {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
      primaryGuest: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        document: ['', Validators.required]
      }),
      additionalGuests: this.fb.array([]),
      specialRequests: [''],
      promoCode: ['']
    });

    this.bookingForm.get('guests')?.valueChanges.subscribe(guestCount => {
      this.updateAdditionalGuests(guestCount);
    });
  }

  private initPaymentForm(): void {
    this.paymentForm = this.fb.group({
      paymentMethod: ['CREDIT_CARD', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardHolder: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }

  public get additionalGuests(): FormArray {
    return this.bookingForm.get('additionalGuests') as FormArray;
  }

  private updateAdditionalGuests(guestCount: number): void {
    const currentGuests = this.additionalGuests.length;
    const requiredGuests = guestCount > 1 ? guestCount - 1 : 0;

    if (requiredGuests > currentGuests) {
      for (let i = currentGuests; i < requiredGuests; i++) {
        this.additionalGuests.push(this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          document: ['', Validators.required]
        }));
      }
    } else if (requiredGuests < currentGuests) {
      for (let i = currentGuests - 1; i >= requiredGuests; i--) {
        this.additionalGuests.removeAt(i);
      }
    }
  }

  public calculateNights(): number {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (end <= start) return 0;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  public calculateTotal(): number {
    const nights = this.calculateNights();
    return nights * this.hotel.pricePerNight;
  }

  public async onConfirmBooking(): Promise<void> {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isConfirming = true;

    const formValue = this.bookingForm.value;
    const bookingPayload: BookingCreateRequest = {
      hotelId: this.hotel.id,
      roomId: this.hotel.id,
      checkIn: formValue.checkIn,
      checkOut: formValue.checkOut,
      guests: formValue.guests,
      guestDetails: {
        primaryGuest: formValue.primaryGuest,
        additionalGuests: formValue.additionalGuests || []
      },
      specialRequests: formValue.specialRequests,
      promoCode: formValue.promoCode
    };

    try {
      const response = await this.bookingService.createBooking(bookingPayload);
      const bookingId = (response as any)?.id ?? (response as any)?.data?.id;
      const total = (response as any)?.pricing?.total ?? null;

      this.confirmedBookingId = bookingId;
      this.confirmedTotal = total;

      this.currentStep = 'payment';
      this.isConfirming = false;
      this.cdref.detectChanges();
    } catch (error) {
      console.error("Erro ao confirmar reserva:", error);
    } finally {
      this.isConfirming = false;
    }
  }

  public async onProcessPayment(): Promise<void> {
    if (!this.confirmedBookingId) {
      console.error("Booking ID não encontrado. Confirme a reserva primeiro.");
      return;
    }

    this.isPaying = true;

    const paymentPayload = {
      paymentMethod: this.paymentForm.value.paymentMethod,
      cardNumber: this.paymentForm.value.cardNumber,
      amount: this.confirmedTotal
    };

    try {
      const response = await this.paymentService.confirmPayment(this.confirmedBookingId, paymentPayload);
      this.dialogRef.close({ success: true, data: response });
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
    } finally {
      this.isPaying = false;
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
