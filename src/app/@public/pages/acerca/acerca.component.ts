import { Component, OnInit } from '@angular/core';
import { closeAlert, loadData } from 'src/app/@shared/alerts';
import { Historias } from '../../models/historia';
import { AcercaPublicService } from './acerca-public.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  listHistoria: Historias[]=[];
  constructor(private historiaService: AcercaPublicService) { }

  ngOnInit(): void {
    this.mostrarHistoria();
  }
  mostrarHistoria(){
    loadData('Cargando Contenido','Espere porfavor!');
    this.historiaService.getHistoria().subscribe(data=>{
      this.listHistoria= data.historia;
      closeAlert();
    }, error=>{
      console.log(error);
    })
  }
}
