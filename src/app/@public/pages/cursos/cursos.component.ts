import { Component, OnInit } from '@angular/core';
import { closeAlert, loadData } from 'src/app/@shared/alerts';
import { Areas } from '../../models/areas';
import { CursosPublicService } from './cursos-public.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  listCursos: Areas[]=[];
  constructor(private cursosService: CursosPublicService) { }

  ngOnInit(): void {
    this.mostrarCursos();
  }
  mostrarCursos(){
    loadData('Cargando Contenido','Espere porfavor!');
    this.cursosService.getCursos().subscribe(data=>{
      this.listCursos = data.areas;
      closeAlert();
    }, error=>{
      console.log(error);
      
    })
  }
}
