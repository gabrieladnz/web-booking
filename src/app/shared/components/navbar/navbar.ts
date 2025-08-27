import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Login } from '../../../pages/login/login';
import { Register } from '../../../pages/register/register';
import { TokenService } from '../../../core/services/token/token.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isMenuOpen = false;

  constructor(public dialog: MatDialog, private tokenService: TokenService, private authService: AuthService) { }

  protected toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected closeMenu(): void {
    this.isMenuOpen = false;
  }

  protected onLoginClick(): void {
    this.dialog.open(Login, {
      width: '400px'
    });
    this.closeMenu();
  }

  protected onSignupClick(): void {
    this.dialog.open(Register, {
      width: '400px'
    });

    this.closeMenu();
  }

  public get isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  protected async onLogoutClick(): Promise<void> {
    await this.authService.logout();
    window.location.reload();
  }
}
