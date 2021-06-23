import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [{
  path: '',
    component: PublicComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./../pages/inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path:'acerca',
        loadChildren: () => import('./../pages/acerca/acerca.module').then(m => m.AcercaModule)
      },
      {
        path:'cursos',
        loadChildren: () => import('./../pages/cursos/cursos.module').then(m => m.CursosModule)
      },
      {
        path:'profesores',
        loadChildren: () => import('./../pages/profesores/profesores.module').then(m => m.ProfesoresModule)
      },
      {
        path:'contacto',
        loadChildren: () => import('./../pages/contacto/contacto.module').then(m => m.ContactoModule)
      },
      {
        path:'noticias',
        loadChildren: () => import('./../pages/escribenos/escribenos.module').then(m => m.EscribenosModule)
      },
      {
        path:'login',
        loadChildren: () => import('./../pages/login/login.module').then(m => m.LoginModule)
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
