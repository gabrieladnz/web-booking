// Angular Core
import { Injectable, inject } from '@angular/core';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  /**
   * @description Mostra uma notificação de sucesso.
   */
  public success(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      panelClass: ['success-snackbar'],
    });
  }

  /**
   * @description Mostra uma notificação de erro.
   */
  public error(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
  }

  /**
   * @description Mostra uma notificação de aviso.
   */
  public warning(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      panelClass: ['warning-snackbar'],
    });
  }
}
