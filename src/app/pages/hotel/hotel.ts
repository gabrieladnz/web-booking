import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-hotel',
  imports: [Navbar, Footer],
  templateUrl: './hotel.html',
  styleUrl: './hotel.scss'
})
export class Hotel {

}
