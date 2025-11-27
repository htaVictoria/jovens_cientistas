import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, FloatLabelModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

}
