import { Injectable, effect } from '@angular/core';
import { isLoggedInSignal } from './auth.signals';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {
    effect(() => {
      const isLogged = isLoggedInSignal();
      if (!isLogged) {
        router.navigate(['/login']);
      }
    });
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      isLoggedInSignal.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    isLoggedInSignal.set(false);
    this.router.navigate(['/login']);
  }
}