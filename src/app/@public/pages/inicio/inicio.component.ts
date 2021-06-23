import { Component, OnInit } from '@angular/core';
import { Areas } from '../../models/areas';
import { Historias } from '../../models/historia';
import { InicioPublicService } from './inicio-public.service';
import Swal from 'sweetalert2';
import { closeAlert, loadData } from 'src/app/@shared/alerts';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  listHistoria: Historias[] =[];
  listAreas: Areas[]=[];
  constructor(private inicioService: InicioPublicService) { }

  ngOnInit(): void {
    
    this.mostrarMision();
    this.mostrarAreas();
    
  }
  mostrarMision(){
    loadData('Cargando Contenido','Espere porfavor!');
    this.inicioService.getHistoria().subscribe(data=>{
      this.listHistoria = data.historia;
      closeAlert();
    },error=>{
      console.log(error);
      
    });
    
  }
  mostrarAreas(){
    this.inicioService.getAreas().subscribe(data=>{      
      this.listAreas = data.areas;
      console.log(this.listAreas);
      
    },error=>{
      console.log(error);
      
    })
  }
}
