import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MensajesAdminService {
  url =`${environment.backend}/api/mensaje/`
  constructor(private http: HttpClient) { }

  getMensaje():Observable<any>{
    return this.http.get(this.url);
  }
  deleteMensaje(id:any):Observable<any>{
    return this.http.delete(this.url+id);
  }
}
