import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (!authService.isAuthenticated() || !user) {
    return router.createUrlTree(['/login']);
  }

  const requiredRoles = route.data['roles'] as string[];
  if (requiredRoles && requiredRoles.length > 0) {
    if (requiredRoles.includes(user.role)) {
      return true;
    } else {
      if (user.role === 'chef') return router.createUrlTree(['/kitchen']);
      if (user.role === 'waiter') return router.createUrlTree(['/orders']);
      if (user.role === 'general_assistant') return router.createUrlTree(['/orders']);
      
      return router.createUrlTree(['/login']);
    }
  }

  return true;
};
