import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {
  private productoService = inject(ProductoService);

  productos = signal<Producto[]>([]);
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error.set('No se pudieron cargar los productos. ¿La API está corriendo?');
        this.cargando.set(false);
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.productos.update(items => items.filter(p => p.id !== id));
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('No se pudo eliminar el producto.');
      }
    });
  }
}
