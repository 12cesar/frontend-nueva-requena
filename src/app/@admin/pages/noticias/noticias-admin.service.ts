import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiasAdminService {
  url=`${environment.backend}/api/noticias/`
  urlActualizarImg=`${environment.backend}/api/uploadsNoticia/`
  constructor(private http: HttpClient) { }

  getNoticias():Observable<any>{
    return this.http.get(this.url);
  }
  postNoticias(formData: FormData):Observable<any>{
    return this.http.post(this.url,formData)
  }
  getNoticia(id:any):Observable<any>{
    return this.http.get(this.url+id);
  }
  putNoticias(formData: FormData, id: string):Observable<any>{
    return this.http.put(this.url+id, formData);
  }
  deleteNoticias(id:any):Observable<any>{
    return this.http.delete(this.url+id);
  }
  putImagen(formData: FormData, id: string):Observable<any>{
    return this.http.put(this.urlActualizarImg+id, formData);
  }
}
