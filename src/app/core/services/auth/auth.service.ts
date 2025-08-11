import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { TokenService } from '../token/token.service';
import { AuthLoginRequest, AuthLoginSuccessResponse, AuthRegisterRequest, AuthRegisterSuccessResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  constructor(protected override http: HttpClient, private tokenService: TokenService) {
    super(http);
  }

  public async login(body: AuthLoginRequest): Promise<AuthLoginSuccessResponse> {
    try {
      return await lastValueFrom(
        this.post<AuthLoginSuccessResponse>('api/auth/login', body),
      );
    } catch (error) {
      const errorResponse = {
        success: false,
        message: error,
      };

      throw errorResponse;
    }
  }

  public async register(body: AuthRegisterRequest): Promise<AuthRegisterSuccessResponse> {
    try {
      return await lastValueFrom(
        this.post<AuthRegisterSuccessResponse>('api/user/register', body),
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
