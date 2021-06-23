import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresPublicService {
  url = `${environment.backend}/api/docentes/`;
  constructor(private http: HttpClient) { }

  getDocentes():Observable<any>{
    return this.http.get(this.url);
  }
}
