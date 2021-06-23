import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CursosPublicService {
  url = `${environment.backend}/api/areas`
  constructor(private http: HttpClient) { }

  getCursos():Observable<any>{
    return this.http.get(this.url);
  }
}
