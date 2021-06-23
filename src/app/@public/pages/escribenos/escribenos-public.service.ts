import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EscribenosPublicService {
  url = `${environment.backend}/api/noticias`;
  constructor(private http: HttpClient) { }

  getNoticias():Observable<any>{
    return this.http.get(this.url);
  }
}
