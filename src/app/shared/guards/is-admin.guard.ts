import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { inject } from '@angular/core';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  if (authService.isAdmin()) {
    return true;
  }
  router.navigate(['error'])
  return false
}
