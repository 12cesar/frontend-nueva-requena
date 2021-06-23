import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesAdminService {
  url= `${environment.backend}/api/historias/`
  urlPutImage= `${environment.backend}/api/uploads/`
  constructor(private http: HttpClient) { }

  getHistorias():Observable<any>{
    return this.http.get(this.url);
  }
  getHistoria(id:any):Observable<any>{
    return this.http.get(this.url+id);
  }
  putHistoria(formData:FormData, id:string):Observable<any>{
    return this.http.put(this.url+id, formData);
  }
  putImage(formData:FormData,id:string):Observable<any>{
    return this.http.put(this.urlPutImage+'historias/'+id, formData);
  }
}
