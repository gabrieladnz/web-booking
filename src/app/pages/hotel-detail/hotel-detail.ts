import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Footer } from "../../shared/components/footer/footer";
import { Navbar } from "../../shared/components/navbar/navbar";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Hotel } from '../../core/services/hotels/hotels.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HotelsService } from '../../core/services/hotels/hotels.service';
import { TokenService } from '../../core/services/token/token.service';
import { Login } from '../login/login';
import { ModalConfirmBooking } from '../../shared/components/modal-confirm-booking/modal-confirm-booking';

@Component({
  selector: 'app-hotel-detail',
  imports: [Footer, Navbar, CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './hotel-detail.html',
  styleUrl: './hotel-detail.scss'
})
export class HotelDetail implements OnInit {
  public hotel!: Hotel;
  public error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private hotelService: HotelsService,
    private tokenService: TokenService,
    private cdr: ChangeDetectorRef,
  ) { }

  public async ngOnInit(): Promise<void> {
    const hotelId = this.route.snapshot.paramMap.get('id');

    if (!hotelId) {
      this.error = "ID do hotel não encontrado na rota.";
      return;
    }

    try {
      this.hotel = await this.hotelService.getHotelById(hotelId);
      console.log('Detalhes do hotel carregados:', this.hotel);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao buscar detalhes do hotel:', error);
      this.error = 'Não foi possível carregar os detalhes do hotel. Tente novamente mais tarde.';
    }
  }

  public goBack(): void {
    this.router.navigate(['/hoteis']);
  }

  public openBookingModal(hotel: Hotel): void {
    this.dialog.open(ModalConfirmBooking, {
      data: { hotel }
    });
  }

  public get isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  protected openLoginModal(): void {
    this.dialog.open(Login, { width: '400px' });
  }
}
