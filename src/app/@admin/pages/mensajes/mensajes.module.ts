import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajesRoutingModule } from './mensajes-routing.module';
import { MensajesComponent } from './mensajes.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    MensajesComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MensajesRoutingModule
  ]
})
export class MensajesModule { }
