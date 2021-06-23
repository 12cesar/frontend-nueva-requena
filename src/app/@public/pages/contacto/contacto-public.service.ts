import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactoPublicService {
  url =`${environment.backend}/api/mensaje/`;
  constructor(private http: HttpClient) { }

  postMensaje(formdata:FormData):Observable<any>{
    return this.http.post(this.url,formdata);
  }
}
