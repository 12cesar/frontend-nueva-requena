import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoPublicService } from './contacto-public.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contactoForm: FormGroup;
  constructor(private contactoService: ContactoPublicService, private fb: FormBuilder) {
    this.contactoForm = fb.group({
      nombre: ['', Validators.required],
      correo: '',
      mensaje: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  enviar() {
    const formData = new FormData();
    formData.append('nombre', this.contactoForm.get('nombre')?.value);
    formData.append('correo', this.contactoForm.get('correo')?.value);
    formData.append('mensaje', this.contactoForm.get('mensaje')?.value);
    this.contactoService.postMensaje(formData).subscribe(data => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mensaje enviado',
        showConfirmButton: false,
        timer: 1500
      });
      this.contactoForm.setValue({
        nombre: '',
        correo: '',
        mensaje: '',
      })
    }, error => {
      console.log(error);

    })
  }
}
