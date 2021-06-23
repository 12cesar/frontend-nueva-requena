import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Areas } from '../../models/areas';
import { Categorias } from '../../models/categorias';
import { Docentes } from '../../models/docentes';
import { DocentesAdminService } from './docentes-admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  listDocentes: Docentes[] =[];
  listAreas: Areas[]=[];
  listCategorias: Categorias[]=[];
  pageActual: number =1;
  uploadFiles?: File 
  imagenAreaPri?:string;
  docentesForm: FormGroup;
  ids?: string;
  titulo: string = 'Crear Docente';
  @ViewChild('fileInput', {static: false}) fileInput?: ElementRef;
  constructor(private docentesService: DocentesAdminService,private toastr: ToastrService, private fb: FormBuilder, private sanitizer: DomSanitizer) { 
    this.docentesForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      area: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.mostrarDocentes();
  }
  mostrarDocentes(){
    this.docentesService.getDocentes().subscribe(data=>{
      this.listDocentes = data.docentes;
      console.log(this.listDocentes);
      
    }, error =>{
      console.log(error);
    });
    this.docentesService.getAreas().subscribe(data=>{
      this.listAreas = data.areas;
      
    }, error =>{
      console.log(error);
    });
    this.docentesService.getCategorias().subscribe(data=>{
      this.listCategorias = data.categorias;
      
    }, error =>{
      console.log(error);
    });
  }
  getDocente(id:any){
    this.docentesService.getDocente(id).subscribe(data=>{
      this.docentesForm.setValue({
        nombre: data.docente.nombre,
        apellido: data.docente.apellido,
        descripcion: data.docente.descripcion,
        categoria: data.docente.categoria._id,
        area: data.docente.area._id,
      });
      this.imagenAreaPri = data.docente.img;
      this.ids= data.docente._id;
      this.titulo = 'Editar Docente';
    }, error=>{ 
      console.log(error);
    })
  }
  deleteDocente(id:any){
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
        this.docentesService.deleteDocente(id).subscribe(data=>{
          Swal.fire(
            'Eliminado!',
            'El docente ha sido eliminado.',
            'success'
          );
          this.mostrarDocentes();
        },error=>{
          console.log(error);
        });
      }
    });
  }
  agregarDocente(){
    if (this.ids === undefined) {
      const formData = new FormData;
      const imageBlob = this.fileInput!.nativeElement.files[0];
      formData.set('file', imageBlob);
      formData.append('nombre', this.docentesForm.get('nombre')?.value);
      formData.append('apellido', this.docentesForm.get('apellido')?.value);
      formData.append('descripcion', this.docentesForm.get('descripcion')?.value);
      formData.append('categoria', this.docentesForm.get('categoria')?.value);
      formData.append('area', this.docentesForm.get('area')?.value);
      this.docentesService.postDocente(formData).subscribe(data=>{
        this.toastr.success('El docente ha sido creado con exito!','DOCENTE CREADO');
        this.mostrarDocentes();
      }, error =>{
        this.toastr.warning(`${error.error.errors[0].msg}`, 'ERROR');
      });
      this.ids = undefined;
      this.docentesForm.setValue({
        nombre: '',
        apellido: '',
        descripcion: '',
        categoria: '',
        area: ''
      });
      this.imagenAreaPri = undefined;
      this.titulo ='Crear Docente'
      this.reset();
    }else if(this.ids!==undefined){
      const formData = new FormData();
      formData.append('nombre', this.docentesForm.get('nombre')?.value);
      formData.append('apellido', this.docentesForm.get('apellido')?.value);
      formData.append('descripcion', this.docentesForm.get('descripcion')?.value);
      formData.append('categoria', this.docentesForm.get('categoria')?.value);
      formData.append('area', this.docentesForm.get('area')?.value);
      this.docentesService.putDocente(formData, this.ids).subscribe(data=>{
        this.toastr.info('El docente ha sido editado con exito!','DOCENTE EDITADO');
        this.mostrarDocentes();
      }, error=>{
        console.log(error);
      });
      this.ids = undefined;
      this.docentesForm.setValue({
        nombre: '',
        apellido: '',
        descripcion: '',
        categoria: '',
        area: ''
      });
      this.imagenAreaPri = undefined;
      this.titulo ='Crear Docente'
      this.reset();
    }
    
    
  }
  cancelar(){
    this.docentesForm.setValue({
      nombre: '',
      apellido: '',
      descripcion: '',
      categoria: '',
      area: ''
    });
    this.imagenAreaPri = ''
    this.titulo ='Crear Docente';
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
          this.docentesService.putImagen(formData, this.ids).subscribe(data=>{
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
