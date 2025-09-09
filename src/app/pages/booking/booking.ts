// Angular core imports
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material imports
import { MatDialog } from '@angular/material/dialog';

// Shared components
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

// Services
import { TokenService } from '../../core/services/token/token.service';
import { BookingService } from '../../core/services/booking/booking.service';
import { SnackbarService } from '../../core/services/snackbar/snackbar.service';

// Interfaces
import { BookingSummary } from '../../core/services/booking/booking.interface';

// Dialog components
import { Login } from '../login/login';
import { Register } from '../register/register';
import { ModalCancelBooking } from '../../shared/components/modal-cancel-booking/modal-cancel-booking';

@Component({
  selector: 'app-booking',
  imports: [Navbar, Footer, CommonModule, RouterModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class Booking implements OnInit {
  constructor(
    private tokenService: TokenService,
    public dialog: MatDialog,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    private snackService: SnackbarService
  ) { }

  public features = [
    {
      icon: 'hotel' as const,
      title: 'Reserve hotéis',
      description: 'Encontre e reserve os melhores hotéis para sua viagem'
    },
    {
      icon: 'calendar' as const,
      title: 'Gerencie reservas',
      description: 'Visualize e gerencie todas suas reservas em um só lugar'
    },
    {
      icon: 'user' as const,
      title: 'Perfil personalizado',
      description: 'Mantenha seus dados e preferências sempre atualizados'
    }
  ];

  public reservations: BookingSummary[] = [];

  public async ngOnInit(): Promise<void> {
    if (this.isAuthenticated) {
      await this.loadBookings();
    }
  }

  private async loadBookings(): Promise<void> {
    try {
      const response = await this.bookingService.getAllBookings();
      this.reservations = response || [];
      this.cdr.detectChanges();
    } catch (error) {
      this.reservations = [];
      this.cdr.detectChanges();
      this.snackService.error('Erro ao carregar suas reservas. Tente novamente.');
    }
  }

  protected onLoginClick(): void {
    this.dialog.open(Login, { width: '400px' });
  }

  protected onSignupClick(): void {
    this.dialog.open(Register, { width: '400px' });
  }

  public get isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  public getStatusText(status: BookingSummary['status']): string {
    const statusMap: any = {
      CONFIRMED: 'Confirmada',
      PENDING: 'Pendente',
      CANCELLED: 'Cancelada'
    };

    return statusMap[status] || 'Desconhecido';
  }

  protected cancelBooking(bookingId: string, hotelName: string): void {
    this.dialog.open(ModalCancelBooking, {
      width: '400px',
      data: { bookingId, hotelName }
    }).afterClosed().subscribe(async (result) => {
      if (result === 'confirmed') {
        await this.loadBookings();
      }
    }
    );
  }
}
