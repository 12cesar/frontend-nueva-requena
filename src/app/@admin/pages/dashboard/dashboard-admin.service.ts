import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {
  url =`${environment.backend}/api/uploads`;
  constructor(private http: HttpClient) { }
  getDashboard():Observable<any>{
    return this.http.get(this.url);
  }
}
