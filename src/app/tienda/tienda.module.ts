import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './tienda.component';
import { TiposComponent } from './tipos/tipos.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { TiendaService } from './tienda.service';
import { TiendaRoutingModule } from './tienda-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [TiendaComponent, TiposComponent, MascotasComponent],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    SharedModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  providers: [TiendaService],
})
export class TiendaModule {}
