
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorias } from '../../models/categorias';
import { CategoriasAdminService } from './categorias-admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  titulo = 'Crear Categoria';
  ids:string | undefined;
  listCategorias: Categorias[] =[];
  enviado= false;
  categoriaForm: FormGroup;
  page:string = '1';
  pageActual: number =1;
  public pages: number = 1;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private categoriaService: CategoriasAdminService) {
    this.categoriaForm = this.fb.group({
      nombre:['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.obtenerCategoria();
  }
  agregarCategoria(){
    this.enviado =true
    console.log(this.categoriaForm);
    console.log(this.categoriaForm.get('nombre')?.value);
    const CATEGORIA: Categorias ={
      nombre: this.categoriaForm.get('nombre')?.value      
    }
    if (this.ids !== undefined) {
      //editamos producto
      this.categoriaService.editarCategoria(this.ids, CATEGORIA).subscribe(data=>{
        this.toastr.info('La categoria ha sido actualizada con exito!', 'Categoria Actualizada!');
        this.enviado = false
        this.categoriaForm.setValue({
          nombre: ''
        });
        this.ids=undefined
        this.titulo='Crear Categoria';
        this.obtenerCategoria();
      }, error=>{
        console.log(error);
        this.categoriaForm.reset();
        
      })
    }else{
      this.categoriaService.guardarCategoria(CATEGORIA).subscribe(data=>{
        this.toastr.success('La categoria ha sido registrado con exito!', 'Categoria Registrada!');
        this.enviado = false
        this.categoriaForm.setValue({
          nombre: ''
        });
        this.obtenerCategoria();
      }, error =>{
        console.log(error.error.errors[0].msg);
        this.toastr.error(`${error.error.errors[0].msg}!`, 'Error en el Registro!');
        this.categoriaForm.reset();
        this.enviado = false
      })
    } 
    

  }
  obtenerCategoria(){
    this.categoriaService.getCategorias().subscribe(data=>{
      console.log(data);
      
      this.listCategorias = data.categorias;
      this.pages = data.pages;
      console.log(this.pages);
      
    }, error=>{
      console.log(error);
      
    })
  }
  deleteCategoria(id:any){
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
        this.categoriaService.eliminarCategoria(id).subscribe(data=>{
          Swal.fire(
            'Eliminado!',
            'La categoria ha sido eliminada.',
            'success'
          );
          this.obtenerCategoria();
        },error=>{
          console.log(error);
        });
      }
    });
  }
  getCategoria(id:any){
    this.ids = id;
    this.titulo = 'Editar categoria'
    this.categoriaService.obtenerCategoria(id).subscribe(data=>{
      this.categoriaForm.setValue({
        nombre:data.categoria.nombre
      })
      
    },error=>{
      console.log(error);
      
    })
  }
  cancelar(){
    if (this.ids!==undefined) {
      this.categoriaForm.setValue({
        nombre: ''
      })
      this.titulo = 'crear categoria'
      this.ids =undefined
    }
  }
  refreshCountries(){

  }
}
