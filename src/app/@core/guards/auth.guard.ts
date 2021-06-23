import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginPublicService } from 'src/app/@public/pages/login/login-public.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginPublicService, private router: Router){
    
  }
  canActivate(): boolean{
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
      return false;
  }
  
  
}
