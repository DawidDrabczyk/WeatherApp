import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (sessionStorage.getItem('login') && sessionStorage.getItem('pass')) {
    return router.createUrlTree(['/home']);
  }
  return true;
};
