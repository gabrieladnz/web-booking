import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Login } from '../../../pages/login/login';
import { Register } from '../../../pages/register/register';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isMenuOpen = false;

  constructor(public dialog: MatDialog) { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onLoginClick(): void {
    this.dialog.open(Login, {
      width: '400px'
    });
    this.closeMenu();
  }

  onSignupClick(): void {
    this.dialog.open(Register, {
      width: '400px'
    });
    this.closeMenu();
  }
}
