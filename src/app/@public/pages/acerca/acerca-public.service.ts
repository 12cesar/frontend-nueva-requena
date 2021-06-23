import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AcercaPublicService {
  url = `${environment.backend}/api/historias`
  constructor(private http: HttpClient) { }

  getHistoria():Observable<any>{
    return this.http.get(this.url);
  }
}
