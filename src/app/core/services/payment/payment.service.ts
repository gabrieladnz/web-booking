// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third-party imports
import { lastValueFrom } from 'rxjs';

// Application imports
import { ApiService } from '../../api/api.service';
import { TokenService } from '../token/token.service';
import { PaymentRequest, PaymentResponse } from './payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends ApiService {
  constructor(
    protected override http: HttpClient,
    private tokenService: TokenService
  ) {
    super(http);
  }

  public async confirmPayment(bookingId: string, body: PaymentRequest): Promise<PaymentResponse> {
    try {
      const token = this.tokenService.get() || undefined;

      return await lastValueFrom(
        this.post<PaymentResponse>(`api/booking/${bookingId}/pay`, body, token),
      );
    } catch (error) {
      throw {
        success: false,
        message: error,
      };
    }
  }
}
