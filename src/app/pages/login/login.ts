import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Register } from '../register/register';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatFormFieldModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  @Output() public closeModal = new EventEmitter<void>();
  @Output() public navigateToSignup = new EventEmitter<void>();

  public loginForm!: FormGroup;
  public showPassword = false;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<Login>, private dialog: MatDialog, private authService: AuthService) { }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public get formControls() {
    return this.loginForm.controls;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onNavigateToSignup(): void {
    this.onClose();
    this.dialog.open(Register);
  }

  public async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {
      const response = await this.authService.login(this.loginForm.value);
      console.log(response);
      this.onClose();
    } catch (error) {
      console.error(error);
    }
  }

}
