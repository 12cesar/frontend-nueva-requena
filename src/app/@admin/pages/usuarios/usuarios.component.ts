import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuarios';
import { UsuariosAdminService } from './usuarios-admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listUsuario: Usuario[] = [];
  titulo:string = 'Crear usuario';
  @ViewChild('fileInput', {static: false}) fileInput?: ElementRef;
  uploadFiles?: File 
  imagenAreaPri?:string;
  ids?: string;
  pageActual: number = 1;
  usuarioForm: FormGroup;
  constructor(private fb: FormBuilder,private toastr: ToastrService,private usuarioService: UsuariosAdminService, private sanitizer: DomSanitizer) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.mostrarUsuarios();
  }
  agregarUsuario(){
    if (this.ids===undefined) {
      const formData = new FormData();
      formData.append('nombre', this.usuarioForm.get('nombre')?.value);
      formData.append('usuario', this.usuarioForm.get('usuario')?.value);
      formData.append('password', this.usuarioForm.get('password')?.value);
      this.usuarioService.postUsuarios(formData).subscribe(data=>{
        this.toastr.success('Usuario creado con exito!','USUARIO CREADO');
        this.mostrarUsuarios();
      }, error=>{
        console.log(error);
        
      })
      this.ids = undefined;
      this.usuarioForm.setValue({
        nombre: '',
        usuario: '',
        password: ''
      });
      this.imagenAreaPri = undefined;
      this.titulo ='Crear Usuario';
    }else if (this.ids !==undefined) {
      const formData = new FormData();
      formData.append('nombre', this.usuarioForm.get('nombre')?.value);
      formData.append('usuario', this.usuarioForm.get('usuario')?.value);
      formData.append('password', this.usuarioForm.get('password')?.value);
      this.usuarioService.putUsuario(formData, this.ids).subscribe(data=>{
        this.toastr.info('Usuario actualizado con exito','USUARIO ACTUALIZADO');
        this.mostrarUsuarios();
      }, error=>{
        console.log(error);
        
      })
      this.ids = undefined;
      this.usuarioForm.setValue({
        nombre: '',
        usuario: '',
        password: ''
      });
      this.imagenAreaPri = undefined;
      this.titulo ='Crear Usuario'
      this.reset();
    }
  }
  mostrarUsuarios(){
    this.usuarioService.getUsuarios().subscribe(data=>{
      this.listUsuario = data.usuario;
    }, error=>{
      console.log(error);
      
    })
  }
  getUsuario(id:any){
    this.usuarioService.getUsuario(id).subscribe(data=>{
      this.usuarioForm.setValue({
        nombre: data.usuario.nombre,
        usuario: data.usuario.usuario,
        password: data.usuario.password,

      })
      this.ids = data.usuario._id;
      if (data.usuario.img) {
        this.imagenAreaPri = data.usuario.img;
      }
      else{
        this.imagenAreaPri = undefined
      }
    },error=>{
      console.log(error);
    })
    this.titulo = 'Editar Usuario';
  }
  deleteUsuario(id:any){
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
        this.usuarioService.deleteUsuario(id).subscribe(data=>{
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
          this.mostrarUsuarios();
        },error=>{
          console.log(error);
        });
      }
    });    
  }
  cancelar(){
    this.usuarioForm.setValue({
      nombre: '',
      usuario: '',
      password: ''
    });
    this.imagenAreaPri = undefined
    this.titulo ='Crear usuario';
    this.ids= undefined;
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
          this.usuarioService.putImagen(formData, this.ids).subscribe(data=>{
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
