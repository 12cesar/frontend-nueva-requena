import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoComponent } from './contacto.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContactoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactoRoutingModule
  ]
})
export class ContactoModule { }
