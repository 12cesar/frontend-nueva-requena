
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Areas } from '../../models/areas';
import { AreasAdminService } from './areas-admin.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  listAreas: Areas[]=[];
  uploadFiles?: File 
  areaForm: FormGroup;
  imagenAreaPri?:string;
  ids?: string;
  pageActual: number =1;
  titulo:string = 'Crear Area'
  @ViewChild('fileInput', {static: false}) fileInput?: ElementRef;
  constructor(private areasService: AreasAdminService, private fb: FormBuilder, private toastr: ToastrService, private sanitizer: DomSanitizer) {
    this.areaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
     this.mostrarArea();
  }
  mostrarArea(){
    this.areasService.getAreas().subscribe(data=>{
      this.listAreas = data.areas;
    }, error=>{
      console.log(error);
      
    })
  }
  
  cancelar(){
    this.areaForm.setValue({
      nombre: '',
      descripcion: ''
    });
    this.imagenAreaPri = ''
    this.titulo ='Crear Area';
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
        if (this.ids !==undefined) {
          const formData = new FormData();
          const imageBlob = this.fileInput!.nativeElement.files[0];
          formData.set('file',imageBlob);
          this.areasService.putImagen(formData, this.ids).subscribe(data=>{
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
  agregarArea(){
    
    if(this.ids===undefined){
      const formData = new FormData();

      const imageBlob = this.fileInput!.nativeElement.files[0];
      console.log(imageBlob);
      
      formData.set('file', imageBlob);
      formData.append('nombre',this.areaForm.get('nombre')?.value);
      formData.append('descripcion', this.areaForm.get('descripcion')?.value)
      this.areasService.guardarArea(formData).subscribe(data=>{
        this.toastr.success('El area ha sido creado con exito!','AREA CREADA');
        this.mostrarArea();
      }, error=>{
        console.log(error);
        
      });
      this.ids = undefined;
      this.areaForm.setValue({
        nombre: '',
        descripcion: ''
      });
      this.titulo ='Crear Area'
      this.reset();
    }
    else if (this.ids!==undefined) {
      const formData = new FormData();
      formData.append('nombre', this.areaForm.get('nombre')?.value);
      formData.append('descripcion', this.areaForm.get('descripcion')?.value);
      this.areasService.editarArea(this.ids, formData).subscribe(data=>{
        this.toastr.info('El area ha sido editado con exito!','AREA EDITADA');
        this.mostrarArea();
      }, error =>{
        console.log(error);
      })      
      this.ids = undefined;
      this.areaForm.setValue({
        nombre: '',
        descripcion: ''
      });
      this.imagenAreaPri = undefined;
      this.titulo ='Crear Area'
      this.reset();
    }
    
    
  }
  eliminarArea(id:any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areasService.deleteArea(id).subscribe(data=>{
          Swal.fire(
            'Eliminado!',
            'El area ha sido eliminado.',
            'success'
          );
          this.mostrarArea();
        },error=>{
          console.log(error);
        });
      }
    })
  }
  verAreaID(id: any){
    this.areasService.obtenerArea(id).subscribe(data=>{
     this.areaForm.setValue({
      nombre: data.area.nombre,
      descripcion: data.area.descripcion
    });
    this.imagenAreaPri = data.area.img
    this.ids = data.area._id;
    console.log(this.ids);
    this.titulo = 'Editar Area';
    }, error=>{
      console.log(error);
      
    })
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
