import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/@core/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  children:[
    {
      path:'',
      loadChildren: () => import('./../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path:'noticias',
      loadChildren: () => import('./../pages/noticias/noticias.module').then(m => m.NoticiasModule)
    },
    {
      path:'areas',
      loadChildren: () => import('./../pages/areas/areas.module').then(m => m.AreasModule)
    },
    {
      path:'categorias',
      loadChildren: () => import('./../pages/categorias/categorias.module').then(m => m.CategoriasModule)
    },
    {
      path:'docentes',
      loadChildren: () => import('./../pages/docentes/docentes.module').then(m => m.DocentesModule)
    },
    {
      path:'mensajes',
      loadChildren: () => import('./../pages/mensajes/mensajes.module').then(m => m.MensajesModule)
    },
    {
      path:'configuracion',
      loadChildren: () => import('./../pages/configuraciones/configuraciones.module').then(m => m.ConfiguracionesModule)
    },
    {
      path:'usuarios',
      loadChildren: () => import('./../pages/usuarios/usuarios.module').then(m => m.UsuariosModule)
    },
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
