import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginPublicService } from 'src/app/@public/pages/login/login-public.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: LoginPublicService) { }
    
  intercept(req:any, next:any){
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
  
}
