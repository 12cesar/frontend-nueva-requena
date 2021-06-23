import { Component, OnInit } from '@angular/core';
import { closeAlert, loadData } from 'src/app/@shared/alerts';
import { Docentes } from '../../models/docentes';
import { ProfesoresPublicService } from './profesores-public.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {
  listDocente: Docentes[]=[];
  constructor(private docenteService: ProfesoresPublicService) { }

  ngOnInit(): void {
    this.mostrarDocente();
  }
  mostrarDocente(){
    loadData('Cargando Contenido','Espere porfavor!');
    this.docenteService.getDocentes().subscribe(data=>{
      console.log(data);
      this.listDocente = data.docentes;
      closeAlert();
    }, error=>{
      console.log(error);
      
    })
  }
}
