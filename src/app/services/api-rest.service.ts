import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) { }

  private apiUrlImagenes = 'http://172.17.131.11:3000'; 
  private apiUrlProductos = 'http://localhost:3000/nike';

  subirImagen(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ imageUrl: string }>(`${this.apiUrlImagenes}/upload`, formData);
  }

  // Obtener productos desde la API
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrlProductos}/productos`);
  }

  // Añadir producto a la API
  añadirProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrlProductos}/productos`, producto);
  }

  // Verificar si un producto existe en la API por su referencia
  productoExistente(referencia: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrlProductos}/productos/existe/${referencia}`);
  }

  // Obtener un producto por su referencia desde la API
  getProductoReferencia(referencia: string): Observable<any> {
    return this.http.get(`${this.apiUrlProductos}/productos/${referencia}`);
  }
}
