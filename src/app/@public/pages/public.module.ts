import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { BarraComponent } from '../core/components/barra/barra.component';
import { FooterComponent } from '../core/components/footer/footer.component';


@NgModule({
  declarations: [
    PublicComponent,
    BarraComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
