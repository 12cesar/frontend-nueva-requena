import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAdminService {
  url = `${environment.backend}/api/usuarios/`;
  urlUpdataImge = `${environment.backend}/api/uploads/`;
  constructor(private http: HttpClient) { }
  getUsuarios():Observable<any>{
    return this.http.get(this.url);
  }
  postUsuarios(formData: FormData):Observable<any>{
    return this.http.post(this.url, formData);
  }
  getUsuario(id:any):Observable<any>{
    return this.http.get(this.url+id);
  }
  putUsuario(formData: FormData, id:string):Observable<any>{
    return this.http.put(this.url+id,formData);
  }
  deleteUsuario(id:any):Observable<any>{
    return this.http.delete(this.url+id);
  }
  putImagen(formData: FormData, id: string):Observable<any>{
    return this.http.put(this.urlUpdataImge+'usuarios/'+id, formData);
  }
}
