import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const roles = route.data['roles'];
  const authService = inject(AuthService)

  const authorities = authService.roles ?? [];

  if (authorities.includes("ROLE_ADMIN")) {
    return true;
  } else { 
    router.navigateByUrl("/admin/notAuthorized")
    return false; 

  }
  
};
