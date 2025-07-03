import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personal {
  id: number;
  rol: string;
  nombre_usuario: string;
  clave: string;
  id_rol: number;
  fecha_creacion: string;
}

@Injectable({ providedIn: 'root' })
export class PersonalService {
  private apiUrl = 'http://localhost:3001/api/personal';

  constructor(private http: HttpClient) {}

  getPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
  }

  crearPersonal(personal: Omit<Personal, 'id' | 'fecha_creacion' | 'rol'>): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrl, personal);
  }

  actualizarPersonal(id: number, personal: Omit<Personal, 'id' | 'fecha_creacion' | 'rol'>): Observable<Personal> {
    return this.http.put<Personal>(`${this.apiUrl}/${id}`, personal);
  }

  eliminarPersonal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 