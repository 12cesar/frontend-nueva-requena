import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AreasComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class AreasModule { }
