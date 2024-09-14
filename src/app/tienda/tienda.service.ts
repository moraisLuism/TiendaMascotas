import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth-guard.service';
import { environment } from 'src/environments/environment';
import { ITipo, IMascota } from './tienda.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private authGuard: AuthGuard) {}

  getTipos(): Observable<ITipo[]> {
    const headers = this.getHeaders();
    return this.http.get<ITipo[]>(`${this.urlAPI}tipos`, { headers });
  }

  addTipo(tipo: ITipo): Observable<ITipo> {
    const headers = this.getHeaders();
    return this.http.post<ITipo>(`${this.urlAPI}tipos`, tipo, {
      headers,
    });
  }

  updateTipo(tipo: ITipo): Observable<ITipo> {
    const headers = this.getHeaders();
    return this.http.put<ITipo>(`${this.urlAPI}tipos`, tipo, {
      headers,
    });
  }

  deleteTipo(id: number): Observable<ITipo> {
    const headers = this.getHeaders();
    return this.http.delete<ITipo>(`${this.urlAPI}tipos/${id}`, {
      headers,
    });
  }

  getMascotas(): Observable<IMascota[]> {
    const headers = this.getHeaders();
    return this.http.get<IMascota[]>(`${this.urlAPI}mascotas`, { headers });
  }

  addMascota(mascota: IMascota): Observable<IMascota> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('nombreMascota', mascota.nombreMascota);
    formData.append('edad', mascota.edad.toString());
    formData.append('precio', mascota.precio.toString());
    formData.append('tipoId', mascota.tipoId?.toString()!);
    formData.append('vendida', mascota.vendida ? 'true' : 'false');
    formData.append('foto', mascota.foto!);

    return this.http.post<IMascota>(`${this.urlAPI}mascotas`, formData, {
      headers,
    });
  }

  deleteMascota(id: number): Observable<IMascota> {
    const headers = this.getHeaders();
    return this.http.delete<IMascota>(`${this.urlAPI}mascotas/${id}`, {
      headers,
    });
  }

  updateMascota(mascota: IMascota): Observable<IMascota> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('nombreMascota', mascota.nombreMascota);
    formData.append('edad', mascota.edad.toString());
    formData.append('precio', mascota.precio.toString());
    formData.append('tipoId', mascota.tipoId?.toString()!);
    formData.append('vendida', mascota.vendida ? 'true' : 'false');
    if (mascota.foto) {
      formData.append('foto', mascota.foto!);
    }

    return this.http.put<IMascota>(
      `${this.urlAPI}mascotas/${mascota.idMascota}`,
      formData,
      { headers }
    );
  }

  getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }
}
