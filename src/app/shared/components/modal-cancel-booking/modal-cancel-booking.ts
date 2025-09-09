import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from '../../../core/services/booking/booking.service';

@Component({
  selector: 'app-modal-cancel-booking',
  imports: [CommonModule],
  templateUrl: './modal-cancel-booking.html',
  styleUrl: './modal-cancel-booking.scss'
})
export class ModalCancelBooking {
  public isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ModalCancelBooking>,
    @Inject(MAT_DIALOG_DATA) public data: { bookingId: string; hotelName: string },
    private bookingService: BookingService
  ) { }

  public async onConfirmCancel(): Promise<void> {
    this.isLoading = true;

    try {
      await this.bookingService.cancelBooking(this.data.bookingId);
      this.dialogRef.close('confirmed');
    } catch (err) {
      console.error('Erro ao cancelar reserva:', err);
      this.isLoading = false;
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
