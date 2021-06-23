import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Noticias } from '../../models/noticias';
import { NoticiasAdminService } from './noticias-admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  listNoticias: Noticias[] = [];
  uploadFiles?: File
  noticiasForm: FormGroup;
  imagenAreaPri?: string;
  ids?: string;
  pageActual: number = 1;
  imagenVista?: boolean = false;
  videoVista?: boolean = false;
  tipo?: string;
  titulo: string = 'Crear Noticia';
  butonImagen?: boolean = false;
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;
  constructor(private noticiaService: NoticiasAdminService, private fb: FormBuilder, private toastr: ToastrService, private sanitizer: DomSanitizer) {
    this.noticiasForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      linkVideo: ''
    })
  }

  ngOnInit(): void {
    this.mostrarNoticias();

  }
  agregarNoticia() {
    if (this.ids === undefined) {
      if (this.videoVista) {
        const formData = new FormData();
        formData.append('titulo', this.noticiasForm.get('titulo')?.value);
        formData.append('descripcion', this.noticiasForm.get('descripcion')?.value);
        formData.append('tipo', this.tipo!);
        formData.append('video', this.noticiasForm.get('linkVideo')?.value)
        this.noticiaService.postNoticias(formData).subscribe(data => {
          this.toastr.success('La noticia ha sido creada con exito!', 'NOTICIA CREADA');
          console.log(data);

        }, error => {
          this.toastr.warning(`${error.error.errors[0].msg}`, 'ERROR');
        });
        this.ids = undefined;
        this.noticiasForm.setValue({
          titulo: '',
          descripcion: '',
          linkVideo: ''
        });
        this.imagenAreaPri = undefined;
        this.titulo = 'Crear Noticia';
        (document.getElementById('selectImg') as HTMLInputElement).value = ''
        this.videoVista = false;
      }
      if (this.imagenVista) {
        const formData = new FormData();
        const imageBlob = this.fileInput!.nativeElement.files[0];
        formData.set('file', imageBlob);
        formData.append('titulo', this.noticiasForm.get('titulo')?.value);
        formData.append('descripcion', this.noticiasForm.get('descripcion')?.value);
        formData.append('tipo', this.tipo!);
        this.noticiaService.postNoticias(formData).subscribe(data => {
          this.toastr.success('La noticia ha sido creada con exito!', 'NOTICIA CREADA');
          this.mostrarNoticias();

        }, error => {
          this.toastr.warning(`${error.error.errors[0].msg}`, 'ERROR');
        });
        this.ids = undefined;
        this.noticiasForm.setValue({
          titulo: '',
          descripcion: '',
          linkVideo: ''
        });
        this.imagenAreaPri = undefined;
        this.titulo = 'Crear Noticia';
        (document.getElementById('selectImg') as HTMLInputElement).value = ''
        this.imagenVista = false;
        this.reset();

      }

    }
    else if (this.ids !== undefined) {
      const formData = new FormData();
      formData.append('titulo', this.noticiasForm.get('titulo')?.value);
      formData.append('descripcion', this.noticiasForm.get('descripcion')?.value);
      this.noticiaService.putNoticias(formData, this.ids).subscribe(data => {
        this.toastr.info('La noticia ha sido editado con exito!', 'NOTICIA EDITADA');
        this.mostrarNoticias();
      }, error => {
        console.log(error);
      });
      this.ids = undefined;
      this.noticiasForm.setValue({
        titulo: '',
        descripcion: '',
        linkVideo: ''
      });
      this.imagenAreaPri = undefined;
      this.titulo = 'Crear noticia'
      
      this.butonImagen = undefined;
    }
  }
  mostrarNoticias() {
    this.noticiaService.getNoticias().subscribe(data => {
      this.listNoticias = data.noticias;

    }, error => {
      console.log(error)
    })
  }
  getNoticia(id: any) {
    this.noticiaService.getNoticia(id).subscribe(data => {
      if (data.noticia.tipo === "1") {
        this.noticiasForm.setValue({
          titulo: data.noticia.titulo,
          descripcion: data.noticia.descripcion,
          linkVideo: ''
        });
        this.imagenAreaPri = data.noticia.img;
        this.ids = data.noticia._id;
        this.imagenVista = true;
        this.videoVista = false;
        this.butonImagen = true;
        console.log(this.ids);
        this.titulo = 'Editar Noticia';

      }
      else if (data.noticia.tipo === "2") {
        this.noticiasForm.setValue({
          titulo: data.noticia.titulo,
          descripcion: data.noticia.descripcion,
          linkVideo: data.noticia.img
        });
        this.imagenAreaPri = data.noticia.img;
        this.ids = data.noticia._id;
        this.imagenVista = false;
        this.videoVista = true;
        this.butonImagen = true;
        console.log(this.ids);
        this.titulo = 'Editar Noticia';
      }
    }, error => {
      console.log(error);

    })
  }
  editarImagen() {
    console.log(this.tipo);
    if (this.tipo ==="1") {
      const formData = new FormData();
      const imageBlob = this.fileInput!.nativeElement.files[0];
      formData.set('file', imageBlob);
      formData.append('tipos', this.tipo);
      this.noticiaService.putImagen(formData, this.ids!).subscribe(data=>{
        console.log(data);
        this.toastr.info('Imagen Actualizada con exito!!', 'IMAGEN ACTUALIZADA');

      }, error=>{
        console.log(error);
        
      })
      
    }else if (this.tipo === "2") {
      const formData = new FormData();
      formData.append('tipos', this.tipo);
      formData.append('video', this.noticiasForm.get('linkVideo')?.value);
      this.noticiaService.putImagen(formData, this.ids!).subscribe(data=>{
        console.log(data);
        this.toastr.info('Video Actualizado con exito!!', 'VIDEO ACTUALIZADO');
        this.imagenAreaPri = undefined;
      }, error=>{
        console.log(error);
        
      })
      
    }else{
      this.toastr.warning('Seleccionar un tipo de arhivo', 'ERROR DE SELECCION')
    }

  }
  deleteNoticia(id: any) {
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
        this.noticiaService.deleteNoticias(id).subscribe(data =>{
          Swal.fire(
            'Eliminado!',
            'La Noticia ha sido eliminada.',
            'success'
          );
          this.mostrarNoticias();
        },error=>{
          console.log(error);
        });
      }
    });
  }
  onChange(enventoId: any) {
    if (enventoId.value === "1") {
      this.imagenVista = true;
      this.videoVista = false;
      this.tipo = enventoId.value;
      
    }
    if (enventoId.value === "2") {
      this.imagenVista = false;
      this.videoVista = true;
      this.tipo = enventoId.value;
    }
  }
  cancelar() {
    this.noticiasForm.setValue({
      titulo: '',
      descripcion: '',
      linkVideo: ''
    });
    this.imagenAreaPri = ''
    this.titulo = 'Crear Area';
    this.ids = undefined;
    this.imagenVista = false;
    this.videoVista = false;
    this.butonImagen = undefined;
  }
  capturarFile(event: any) {
    this.uploadFiles = event.target.files[0];
    if (this.uploadFiles!.size > 1072383) {
      this.toastr.warning('El tamaño maximo es de 1 MB', 'ARCHIVO EXCEDE LO ESTIMADO');
      this.reset();
    }
    else {
      this.extraserBase64(this.uploadFiles).then((imagen: any) => {
        this.imagenAreaPri = imagen.base;
      });
    }

  }
  reset() {
    this.fileInput!.nativeElement.value = "";
  }
  extraserBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        })
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}
