import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Producto } from '../models/producto.model';

@Injectable({
providedIn: 'root'
})

export class ProductoService {

private readonly API_URL =
'http://localhost:3000/api/productos';

private http = inject(HttpClient);

// ====================================
// GET -> LISTAR TODOS
// ====================================

getProductos(): Observable<Producto[]> {

return this.http.get<Producto[]>(
  this.API_URL
);

}

// ====================================
// GET POR ID
// ====================================

getProducto(id: number): Observable<Producto> {

return this.http.get<Producto>(
  `${this.API_URL}/${id}`
);

}

// ====================================
// POST -> CREAR
// ====================================

crearProducto(
producto: Producto
): Observable<Producto> {

return this.http.post<Producto>(
  this.API_URL,
  producto
);

}

// ====================================
// PUT -> ACTUALIZAR
// ====================================

actualizarProducto(
id: number,
producto: Producto
): Observable<Producto> {

return this.http.put<Producto>(
  `${this.API_URL}/${id}`,
  producto
);

}

// ====================================
// DELETE
// ====================================

eliminarProducto(
id: number
): Observable<void> {

return this.http.delete<void>(
  `${this.API_URL}/${id}`
);

}

}
