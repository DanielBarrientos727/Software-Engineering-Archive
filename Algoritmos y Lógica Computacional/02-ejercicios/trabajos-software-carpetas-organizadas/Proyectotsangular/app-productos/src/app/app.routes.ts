import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  {
    path: 'productos',
    loadComponent: () =>
      import('./components/lista-productos/lista-productos.component')
        .then(m => m.ListaProductosComponent)
  },
  {
    path: 'productos/nuevo',
    loadComponent: () =>
      import('./components/form-producto/form-producto.component')
        .then(m => m.FormProductoComponent)
  },
  {
    path: 'productos/editar/:id',
    loadComponent: () =>
      import('./components/form-producto/form-producto.component')
        .then(m => m.FormProductoComponent)
  },
  { path: '**', redirectTo: 'productos' }
];
