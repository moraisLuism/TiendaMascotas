import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiposComponent } from './tipos/tipos.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { TiendaComponent } from './tienda.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TiendaComponent,
    children: [
      { path: '', redirectTo: '/tienda/tipos', pathMatch: 'full' },
      { path: 'tipos', component: TiposComponent },
      { path: 'mascotas', component: MascotasComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class TiendaRoutingModule {}
