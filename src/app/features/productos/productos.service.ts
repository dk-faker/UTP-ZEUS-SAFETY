import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './dialog/productos-dialog.component';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private apiUrl = 'http://localhost:3001/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  crearProducto(producto: Omit<Producto, 'codigo'>): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  actualizarProducto(codigo: string, producto: Omit<Producto, 'codigo'>): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${codigo}`, producto);
  }

  eliminarProducto(codigo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${codigo}`);
  }
} 