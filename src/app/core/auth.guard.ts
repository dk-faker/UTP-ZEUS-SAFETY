// src/app/core/auth.guard.ts
import { CanActivateFn, UrlTree, Router } from '@angular/router';
import { isAuthenticated } from './auth.signals';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  if (isAuthenticated()) {
    return true;
  } else {
    return new Router().createUrlTree(['/login']);
  }
};