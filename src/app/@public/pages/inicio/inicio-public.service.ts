import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InicioPublicService {
  urlMision =`${environment.backend}/api/historias/mision`;
  urlAreas = `${environment.backend}/api/areas/tres`;
  constructor(private http: HttpClient) { }

  getHistoria():Observable<any>{
    return this.http.get(this.urlMision);
  }
  getAreas():Observable<any>{
    return this.http.get(this.urlAreas);
  }

}
