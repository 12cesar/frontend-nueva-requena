import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DocentesAdminService {
  url = `${environment.backend}/api/docentes/`;
  urlActualizarImg=`${environment.backend}/api/uploads/`
  urlarea = `${environment.backend}/api/areas/`;
  urlcategoria = `${environment.backend}/api/categorias/`;
  constructor(private http: HttpClient) { }
  getDocentes():Observable<any>{
    return this.http.get(this.url);
  }
  getDocente(id:any):Observable<any>{
    return this.http.get(this.url+id);
  }
  getAreas():Observable<any>{
    return this.http.get(this.urlarea);
  }
  getCategorias():Observable<any>{
    return this.http.get(this.urlcategoria);
  }
  postDocente(formData: FormData):Observable<any>{
    return this.http.post(this.url,formData);
  }
  putDocente(formData: FormData, id:string):Observable<any>{
    return this.http.put(this.url+id, formData);
  }
  deleteDocente(id:any):Observable<any>{
    return this.http.delete(this.url+id);
  }
  putImagen(formData: FormData, id: string):Observable<any>{
    return this.http.put(this.urlActualizarImg+'docentes/'+id, formData);
  }
}
