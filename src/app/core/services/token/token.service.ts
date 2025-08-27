import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private type: 'sessionStorage' | 'localStorage' = 'localStorage';
  private readonly tokenUser = 'auth_token';
  private readonly userIdKey = 'user_id';

  constructor(private router: Router, private http: HttpClient) { }

  public get(): string | null {
    return window[this.type].getItem(this.tokenUser);
  }

  public delete(): void {
    window[this.type].removeItem(this.tokenUser);
    sessionStorage.removeItem(this.userIdKey);
  }

  public save(token: string): void {
    window[this.type].setItem(this.tokenUser, token);
  }

  public isAuthenticated(): boolean {
    return !!this.get();
  }

  public saveUserId(userId: string): void {
    sessionStorage.setItem(this.userIdKey, userId);
  }

  public getUserId(): string | null {
    return sessionStorage.getItem(this.userIdKey);
  }
}
