import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LoginPublicService } from 'src/app/@public/pages/login/login-public.service';

@Component({
  selector: 'app-public-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  constructor(public authService: LoginPublicService, @Inject(DOCUMENT) document: any) { 
    
  }

  
  ngOnInit(): void {
    this.verUrl();

  }
  verUrl(){
    const ver = document.location.href
    const split = ver.split('/');
    console.log(split[3]);
    
  }
}
