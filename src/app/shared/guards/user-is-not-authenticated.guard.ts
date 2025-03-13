import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

export const userIsNotAuthenticatedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router)
  
    if (!authService.isConnected()) {
      return true;
    }
    router.navigate([''])
    return false;
}
