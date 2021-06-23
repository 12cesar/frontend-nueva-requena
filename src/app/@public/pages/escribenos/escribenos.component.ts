import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { closeAlert, loadData } from 'src/app/@shared/alerts';
import { Noticias } from '../../models/noticias';
import { EscribenosPublicService } from './escribenos-public.service';

@Component({
  selector: 'app-escribenos',
  templateUrl: './escribenos.component.html',
  styleUrls: ['./escribenos.component.css']
})
export class EscribenosComponent implements OnInit {
  listNoticias: Noticias[]=[];
  public GenuineUrl: SafeUrl | undefined;
  pageActual: number =1;
  video?:string ='https://www.youtube.com/embed/VowEV23Z0hM';
  constructor(private noticiasService: EscribenosPublicService, private sanitaizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.mostrarNoticias();
  }
  mostrarNoticias(){
    loadData('Cargando Contenido','Espere porfavor!');
    this.noticiasService.getNoticias().subscribe(data=>{
      this.listNoticias = data.noticias;
      for (let i = 0; i < this.listNoticias.length; i++) {
        if (this.listNoticias[i].tipo === "1") {
          console.log('hola');
          this.listNoticias[i].imagen2= this.listNoticias[i].img;
        }else{
          console.log('como estas');
          this.GenuineUrl = this.sanitaizer.bypassSecurityTrustResourceUrl(this.listNoticias[i].img!);
          this.listNoticias[i].imagen2= this.GenuineUrl
        }
      }
      closeAlert();
    }, error=>{
      console.log(error);
      
    })
  }
  public cambiar(video:string){
    console.log(video);
    
  }
}
