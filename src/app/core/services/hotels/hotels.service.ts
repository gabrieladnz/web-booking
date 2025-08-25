import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import {
  HotelsFilterParams,
  HotelsWithFilterResponse,
  HotelsAllResponse,
  HotelByIdResponse
} from './hotels.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  public async getHotelsWithFilter(params?: HotelsFilterParams): Promise<HotelsWithFilterResponse> {
    try {
      return await lastValueFrom(
        this.get<HotelsWithFilterResponse>('api/hotel', params)
      );
    } catch (error) {
      const errorResponse = {
        success: false,
        message: error,
      };

      throw errorResponse;
    }
  }

  public async getAllHotels(): Promise<HotelsAllResponse> {
    try {
      return await lastValueFrom(
        this.get<HotelsAllResponse>('api/hotel/all')
      );
    } catch (error) {
      const errorResponse = {
        success: false,
        message: error,
      };

      throw errorResponse;
    }
  }

  public async getHotelById(hotelId: string): Promise<HotelByIdResponse> {
    try {
      return await lastValueFrom(
        this.get<HotelByIdResponse>(`api/hotel/${hotelId}`)
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