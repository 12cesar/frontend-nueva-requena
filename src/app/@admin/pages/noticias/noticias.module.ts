import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { NoticiasComponent } from './noticias.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class NoticiasModule { }
