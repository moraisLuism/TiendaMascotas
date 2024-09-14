import { Component, OnInit, ViewChild } from '@angular/core';
import { TiendaService } from '../tienda.service';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ITipo } from '../tienda.interfaces';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css'],
  providers: [ConfirmationService],
})
export class TiposComponent implements OnInit {
  constructor(
    private tiendaService: TiendaService,
    private confirmationService: ConfirmationService
  ) {}
  @ViewChild('formulario') formulario!: NgForm;
  visibleError = false;
  mensajeError = '';
  tipos: ITipo[] = [];
  visibleConfirm = false;

  tipo: ITipo = {
    idTipo: 0,
    nombreTipo: '',
    totalMascotas: 0,
  };

  ngOnInit(): void {
    this.getTipos();
  }

  getTipos() {
    this.tiendaService.getTipos().subscribe({
      next: (data) => {
        console.log(data);
        this.visibleError = false;
        this.tipos = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.controlarError(err);
      },
    });
  }

  guardar() {
    if (this.tipo.idTipo === 0) {
      this.tiendaService.addTipo(this.tipo).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.formulario.reset();
          this.getTipos();
        },
        error: (err) => {
          console.log(err);
          this.visibleError = true;
          this.controlarError(err);
        },
      });
    } else {
      this.tiendaService.updateTipo(this.tipo).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelarEdicion();
          this.formulario.reset();
          this.getTipos();
        },
        error: (err) => {
          this.visibleError = true;
          this.controlarError(err);
        },
      });
    }
  }

  edit(tipo: ITipo) {
    this.tipo = { ...tipo };
  }

  cancelarEdicion() {
    this.tipo = {
      idTipo: 0,
      nombreTipo: '',
      totalMascotas: 0,
    };
  }

  confirmDelete(tipo: ITipo) {
    this.confirmationService.confirm({
      message: `Eliminar el tipo ${tipo.nombreTipo}?`,
      header: 'Estás seguro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteTipo(tipo.idTipo!),
    });
  }

  deleteTipo(id: number) {
    this.tiendaService.deleteTipo(id).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.formulario.reset({
          nombreTipo: '',
        });
        this.getTipos();
      },
      error: (err) => {
        this.visibleError = true;
        this.controlarError(err);
      },
    });
  }

  controlarError(err: any) {
    if (err.error && typeof err.error === 'object' && err.error.message) {
      this.mensajeError = err.error.message;
    } else if (typeof err.error === 'string') {
      this.mensajeError = err.error;
    } else {
      this.mensajeError = 'Se ha producido un error inesperado';
    }
  }
}
