import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { Login } from '../../models/login';
import { LoginPublicService } from './login-public.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enviado: boolean = false;
  listLogin: Login[] =[];
  imagenDefecto: string =`${environment.backend}/assets/images/login.png`
  loginForm: FormGroup;
  constructor(private router: Router,private loginService: LoginPublicService, private toastr: ToastrService, private fb: FormBuilder) { 
    this.loginForm= this.fb.group({
      usuario:['', Validators.required],
      password:['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  crearToken(){
    this.enviado = true;

    const formData = new FormData();
    formData.append('usuario', this.loginForm.get('usuario')?.value);
    formData.append('password', this.loginForm.get('password')?.value);
    this.loginService.postLogin(formData).subscribe(data=>{
      console.log(data);
      localStorage.setItem('token', data.token);
      this.router.navigate(['/']);
    }, error=>{
      this.toastr.warning('Usuario o password incorrecto', 'ERROR DE INICIO');

      
    })
    this.enviado = false;
    
  }
}
