import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-booking',
  imports: [Navbar, Footer],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class Booking {

}
