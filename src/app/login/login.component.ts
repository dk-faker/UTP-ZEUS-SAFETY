// src/app/login/login.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { MaterialModule } from '../shared/material';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      this.form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage.set('Por favor, ingresa usuario y contraseña.');
      return;
    }

    this.loading.set(true);
    const { username, password } = this.form.value;

    // Simular llamada a backend (aquí directo)
    setTimeout(() => {
      const ok = this.authService.login(username!, password!);
      if (ok) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage.set('Usuario o contraseña incorrectos.');
      }
      this.loading.set(false);
    }, 800);
  }
}