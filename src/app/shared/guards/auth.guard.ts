import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loggedIn() || (sessionStorage.getItem('login') && sessionStorage.getItem('pass'))) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
