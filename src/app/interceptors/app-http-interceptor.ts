import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';



export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const token = authService.accessToken
  console.log("*********************")
  console.log(req.url); 
  console.log(token)

  if (!req.url.includes("/auth/login")) {
    //dint sent header Authorization when trying to authenticate
    let newrequest = req.clone({
      setHeaders: {
     Authorization : `Bearer ${token}`
   }
    }); 
    return next(newrequest)
  }
  return next(req);
};
