// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third-party imports
import { lastValueFrom } from 'rxjs';

// Application imports
import { ApiService } from '../../api/api.service';
import { TokenService } from '../token/token.service';
import {
  BookingCreateRequest,
  BookingCreateSuccessResponse,
  BookingCancelSuccessResponse,
  BookingDetail,
  BookingSummary
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

  public async getAllBookings(): Promise<BookingSummary[]> {
    try {
      const token = this.tokenService.get() || undefined;

      return await lastValueFrom(
        this.get<BookingSummary[]>('api/booking/my', {}, token),
      );
    } catch (error) {
      throw {
        success: false,
        message: error,
      };
    }
  }

  public async getBookingById(bookingId: string): Promise<BookingDetail> {
    try {
      const token = this.tokenService.get() || undefined;

      return await lastValueFrom(
        this.get<BookingDetail>(`api/booking/my/${bookingId}`, {}, token),
      );
    } catch (error) {
      throw {
        success: false,
        message: error,
      };
    }
  }

}