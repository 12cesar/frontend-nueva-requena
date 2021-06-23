import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categorias } from '../../models/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasAdminService {
  url = `${environment.backend}/api/categorias/`;
  constructor(private http: HttpClient) { }
  getCategorias(): Observable<any>{
    return this.http.get(this.url);
  }
  eliminarCategoria(id:string): Observable<any>{
    return this.http.delete(this.url+id)
  }
  guardarCategoria(categoria: Categorias): Observable<any>{
    return this.http.post(this.url, categoria);
  }
  obtenerCategoria(id:string):Observable<any>{
    return this.http.get(this.url+id);
  }
  editarCategoria(id:string, categoria: Categorias):Observable<any>{
    return this.http.put(this.url+id, categoria);
  }
}
