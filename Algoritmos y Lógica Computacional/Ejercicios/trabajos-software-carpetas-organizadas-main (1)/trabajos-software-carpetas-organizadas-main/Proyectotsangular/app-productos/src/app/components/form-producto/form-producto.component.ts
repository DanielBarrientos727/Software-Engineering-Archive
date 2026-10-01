import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  esEdicion = false;
  idProducto: number | null = null;

  form = this.fb.group({
    nombre: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoria: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idProducto = +id;
      this.productoService.getProducto(this.idProducto).subscribe({
        next: (producto) => this.form.patchValue(producto),
        error: (err) => console.error('Error al cargar producto:', err)
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const datos = this.form.value as any;

    if (this.esEdicion && this.idProducto) {
      this.productoService.actualizarProducto(this.idProducto, datos).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.productoService.crearProducto(datos).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }
}
