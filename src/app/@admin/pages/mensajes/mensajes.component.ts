import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Mensaje } from '../../models/mensajes';
import { MensajesAdminService } from './mensajes-admin.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  listMensaje: Mensaje[]=[];
  pageActual: number =1;
  constructor(private toastr: ToastrService, private mensajeService: MensajesAdminService) { }

  ngOnInit(): void {
    this.mostrarMensaje();
  }
  mostrarMensaje(){
    this.mensajeService.getMensaje().subscribe(data=>{
      this.listMensaje=data.mensaje;
      
    }, error=>{
      console.log(error);
      
    })
  }
  deleteMensaje(id:any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mensajeService.deleteMensaje(id).subscribe(data=>{
          Swal.fire(
            'Eliminado!',
            'Tu mensaje ha sido eliminado.',
            'success'
          );
          this.mostrarMensaje();
        }, error=>{
          console.log(error);
          
        })
        
      }
    })
    
    
  }
}
