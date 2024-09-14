import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TiendaService } from '../tienda.service';
import { ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { IMascota, ITipo } from '../tienda.interfaces';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
  providers: [ConfirmationService],
})
export class MascotasComponent implements OnInit {
  constructor(
    private tiendaService: TiendaService,
    private confirmationService: ConfirmationService
  ) {}
  @ViewChild('formulario') formulario!: NgForm;
  @ViewChild('fileInput') fileInput!: ElementRef;
  visibleError = false;
  mensajeError = '';
  mascotas: IMascota[] = [];
  tipos: ITipo[] = [];
  visibleConfirm = false;
  visibleFoto = false;
  foto = '';

  mascota: IMascota = {
    idMascota: 0,
    nombreMascota: '',
    edad: 0,
    precio: 0,
    foto: null,
	fotoUrl: null,
    vendida: false,
    tipoId: null,
  };

  ngOnInit(): void {
    this.getTipos();
    this.getMascotas();
  }

  getTipos() {
    this.tiendaService.getTipos().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.tipos = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.controlarError(err);
      },
    });
  }

  getMascotas() {
    this.tiendaService.getMascotas().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.mascotas = data;
        console.log(this.mascotas);
      },
      error: (err) => {
        this.visibleError = true;
        this.controlarError(err);
      },
    });
  }

  onChange(event: any) {
    const file = event.target.files;

    if (file && file.length > 0) {
      this.mascota.foto = file[0];
      this.mascota.fotoNombre = file[0].name;
    }
  }

  onAceptar() {
    this.fileInput.nativeElement.value = '';
  }
  
  showImage(mascota: IMascota) {
    if (this.visibleFoto && this.mascota === mascota) {
      this.visibleFoto = false;
    } else {
      this.mascota = mascota;
      this.foto = mascota.fotoUrl!;
      this.visibleFoto = true;
    }
  }

  guardar() {
    if (this.mascota.idMascota === 0) {
        this.tiendaService.addMascota(this.mascota).subscribe({
            next: (data) => {
                this.visibleError = false;
                this.formulario.reset();
                this.getMascotas();
            },
            error: (err) => {
                this.visibleError = true;
                this.controlarError(err);
            },
        });
    } else {
        const formData = new FormData();
        formData.append('idMascota', this.mascota.idMascota.toString());
        if (this.mascota.foto) {
            formData.append('foto', this.mascota.foto!);
        }

        this.tiendaService.updateMascota(this.mascota).subscribe({
            next: (data) => {
                this.visibleError = false;
                this.cancelarEdicion();
                this.formulario.reset();
                this.getMascotas();
            },
            error: (err) => {
                this.visibleError = true;
                this.controlarError(err);
            },
        });
    }
}


  confirmDelete(mascota: IMascota) {
    this.confirmationService.confirm({
      message: `Eliminar la mascota ${mascota.nombreMascota}?`,
      header: 'Estás seguro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí´',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteMascota(mascota.idMascota),
    });
  }

  deleteMascota(id: number) {
    this.tiendaService.deleteMascota(id).subscribe({
      next: (data: IMascota) => {
        this.visibleError = false;
        this.getMascotas();
      },
      error: (err: any) => {
        this.visibleError = true;
        this.controlarError(err);
      },
    });
  }

  edit(mascota: IMascota) {
    this.mascota = { ...mascota };
    this.mascota.fotoNombre = mascota.fotoUrl
      ? this.extraerNombreImagen(mascota.fotoUrl)
      : '';
  }

  extraerNombreImagen(url: string): string {
    return url.split('/').pop() || '';
  }

  cancelarEdicion() {
    this.mascota = {
      idMascota: 0,
      nombreMascota: '',
      edad: 0,
      precio: 0,
      vendida: false,
      tipoId: 0,
      foto: null,
      fotoUrl: null,
    };
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
