import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Login } from '../login/login';
import { AuthService } from '../../core/services/auth/auth.service';
import { SnackbarService } from '../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {
  @Output() public navigateToLogin = new EventEmitter<void>();

  public registerForm!: FormGroup;
  public showPassword = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<Register>,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public get formControls() {
    return this.registerForm.controls;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onNavigateToLogin(): void {
    this.onClose();
    this.dialog.open(Login);
  }

  public async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    try {
      const response = await this.authService.register(this.registerForm.value);
      this.snackbar.success('Cadastro feito com sucesso! Faça login.');
      this.onClose();
    } catch (error) {
      this.snackbar.error('Erro ao fazer cadastro. Tente novamente.');
      console.error(error);
    }
  }
}
