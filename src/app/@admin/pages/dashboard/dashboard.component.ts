import { DashboardAdminService } from './dashboard-admin.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dasboardService: DashboardAdminService) { }
  url =`${environment.backend}/assets/images`;
  usuarios?:number;
  areas?:number;
  docentes?:number;
  noticias?: number;
  categorias?: number;
  ngOnInit(): void {
    this.mostrarDashboard();
  }
  mostrarDashboard(){
    this.dasboardService.getDashboard().subscribe(data=>{
      console.log(data);
      this.usuarios= data.usuario;
      this.areas=data.area;
      this.docentes=data.docente;
      this.noticias = data.noticia;
      this.categorias = data.categoria;
    }, error =>{
      console.log(error);
      
    })
  }
}
