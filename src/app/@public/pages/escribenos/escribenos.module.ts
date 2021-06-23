import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscribenosRoutingModule } from './escribenos-routing.module';
import { EscribenosComponent } from './escribenos.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    EscribenosComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    EscribenosRoutingModule
  ]
})
export class EscribenosModule { }
