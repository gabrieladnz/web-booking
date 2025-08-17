import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-hotel',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './book-hotel.html',
  styleUrl: './book-hotel.scss'
})
export class BookHotel {
  @Output() close = new EventEmitter<void>();

  reservationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formControls() {
    return this.reservationForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('Reserva criada:', this.reservationForm.value);
      this.onClose();
    } else {
      this.reservationForm.markAllAsTouched();
    }
  }
}
