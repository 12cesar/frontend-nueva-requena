import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Historia } from '../../models/historia';
import { ConfiguracionesAdminService } from './configuraciones-admin.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  listHistoria: Historia[]=[];
  pageActual: number =1;
  uploadFiles?: File 
  historiaForm: FormGroup;
  imagenAreaPri?:string;
  ids?: string;
  titulo:string = 'Editar Configuracion';
  @ViewChild('fileInput', {static: false}) fileInput?: ElementRef;
  constructor(private sanitizer: DomSanitizer, private toastr: ToastrService,private historiaService: ConfiguracionesAdminService, private fb: FormBuilder) { 
    this.historiaForm = this.fb.group({
      titulo:['', Validators.required],
      mensaje:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarHistoria();
  }

  mostrarHistoria(){
    this.historiaService.getHistorias().subscribe(data=>{
      console.log(data);
      this.listHistoria =data.historia;
      console.log(this.listHistoria);
      
    }, error=>{
      console.log(error);
      
    })
  }

  verAreaID(id:any){
    console.log(id);
    this.historiaService.getHistoria(id).subscribe(data=>{
      this.historiaForm.setValue({
        titulo:data.historia.titulo,
        mensaje: data.historia.mensaje
      });
      this.imagenAreaPri = data.historia.img
      this.ids = data.historia._id;
    }, error =>{
      console.log(error);
      
    })
    
  }
  agregarHistoria(){
    if (this.ids !== undefined) {
      const formData = new FormData();
      formData.append('titulo', this.historiaForm.get('titulo')?.value);
      formData.append('mensaje', this.historiaForm.get('mensaje')?.value);
      this.historiaService.putHistoria(formData, this.ids).subscribe(data=>{
        this.toastr.info(`Configuracion ha sido editado con exito!`,'CONFIGURACION EDITADA');
        this.mostrarHistoria();
      }, error =>{
        console.log(error);
      });
      this.ids = undefined;
      this.historiaForm.setValue({
        titulo: '',
        mensaje: ''
      });
      this.imagenAreaPri = undefined;
      this.reset();
    }
  }
  cancelar(){
    this.historiaForm.setValue({
      titulo: '',
      mensaje: ''
    });
    this.imagenAreaPri = ''
    this.titulo ='Editar Configuracion';
    this.ids = undefined;
  }
  capturarFile(event:any){
    this.uploadFiles = event.target.files[0];
    if (this.uploadFiles!.size > 1072383) {
      this.toastr.warning('El tamaño maximo es de 1 MB','ARCHIVO EXCEDE LO ESTIMADO');
      this.reset();
    }
    else{
      this.extraserBase64(this.uploadFiles).then((imagen:any) => {
        this.imagenAreaPri = imagen.base;
        if (this.ids !== undefined) {
          console.log('hola');
          const formData = new FormData();
          const imageBlob = this.fileInput!.nativeElement.files[0];
          formData.set('file',imageBlob);
          this.historiaService.putImage(formData, this.ids).subscribe(data=>{
            this.toastr.info('Imagen actualizada con exito!', 'IMAGEN ACTUALIZADA');
          }, error=>{
            console.log(error);
            
          });
          this.reset();
        }
      });  
    }
    
  }
  reset(){
    this.fileInput!.nativeElement.value = "";
  }
  extraserBase64 = async($event :any)=> new Promise((resolve, reject)=>{
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base: reader.result
        })
      };
      reader.onerror=error=>{
        resolve({
          base: null
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}
