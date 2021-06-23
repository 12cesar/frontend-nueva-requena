import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginPublicService {
  url = `${environment.backend}/api/auth/login`
  constructor(private http: HttpClient, private router: Router) { }

  postLogin(formData: FormData): Observable<any>{
    return this.http.post(this.url,formData);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
