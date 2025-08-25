import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { TokenService } from '../token/token.service';
import { 
  BookingCreateRequest, 
  BookingCreateSuccessResponse, 
  BookingCancelSuccessResponse 
} from './booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends ApiService {
  constructor(
    protected override http: HttpClient, 
    private tokenService: TokenService
  ) {
    super(http);
  }

  public async createBooking(body: BookingCreateRequest): Promise<BookingCreateSuccessResponse> {
    try {
      const token = this.tokenService.get() || undefined;

      return await lastValueFrom(
        this.post<BookingCreateSuccessResponse>('api/booking', body, token),
      );
    } catch (error) {
      const errorResponse = {
        success: false,
        message: error,
      };

      throw errorResponse;
    }
  }

  public async cancelBooking(bookingId: string): Promise<BookingCancelSuccessResponse> {
    try {
      const token = this.tokenService.get() || undefined;

      return await lastValueFrom(
        this.delete<BookingCancelSuccessResponse>(`api/booking/${bookingId}/cancel`, undefined, token),
      );
    } catch (error) {
      const errorResponse = {
        success: false,
        message: error,
      };

      throw errorResponse;
    }
  }
}