export interface ITipo {
  idTipo?: number;
  nombreTipo: string;
  totalMascotas: number;
}

export interface IMascota {
  idMascota: number;
  nombreMascota: string;
  edad: number;
  precio: number;
  vendida: boolean;
  foto?: File | null;
  fotoUrl: string | null;
  fotoNombre?: string | null;
  tipoId: number | null;
  tipo?: string;
}
