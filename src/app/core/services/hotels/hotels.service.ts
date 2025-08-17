import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  public async getHotels(): Promise<any> {
    try {
      return await this.get<any>('api/hotels');
    } catch (error) {
      const errorResponse = {
        success: false,
        message: error,
      };
    }
  }
}
