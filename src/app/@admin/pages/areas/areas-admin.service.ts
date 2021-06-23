import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AreasAdminService {
  
  url = `${environment.backend}/api/areas/`;
  urlActualizarImg=`${environment.backend}/api/uploads/`
  constructor(private http: HttpClient) { }

  getAreas():Observable<any>{
    return this.http.get(this.url);
  }
  guardarArea(formData: FormData):Observable<any>{
    return this.http.post(this.url, formData);
  }
  deleteArea(id:string):Observable<any>{
    return this.http.delete(this.url+id);
  }
  obtenerArea(id:any):Observable<any>{
    return this.http.get(this.url+id);
  }
  editarArea(id:any, formData: FormData):Observable<any>{
    return this.http.put(this.url+id, formData);
  }
  putImagen(formData: FormData, id: string):Observable<any>{
    return this.http.put(this.urlActualizarImg+'areas/'+id, formData);
  }
}
