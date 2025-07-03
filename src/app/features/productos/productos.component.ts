import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MaterialModule } from '../../shared/material';
import { ProductosDialogComponent, Producto } from './dialog/productos-dialog.component';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MaterialModule,
    HttpClientModule
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo',
    'categoria',
    'tipo',
    'color_tipo',
    'tamano',
    'pares_por_caja',
    'acciones'
  ];
  dataSource: Producto[] = [];

  constructor(
    private dialog: MatDialog,
    private productosService: ProductosService,
    private snackBar: MatSnackBar
  ) {}

  private cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (productos) => this.dataSource = productos,
      error: (err) => {
        this.dataSource = [];
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  ngOnInit() {
    this.cargarProductos();
  }

  /** Abre el diálogo para crear un nuevo producto */
  nuevoProducto() {
    const dialogRef = this.dialog.open(ProductosDialogComponent, {
      width: '500px',
      data: {} as Partial<Producto>
    });
    dialogRef.afterClosed().subscribe((result: Producto | undefined) => {
      if (result) {
        const { codigo, ...productoSinCodigo } = result;
        this.productosService.crearProducto(productoSinCodigo).subscribe({
          next: () => {
            this.snackBar.open('Producto creado exitosamente', 'Cerrar', { duration: 2500 });
            this.cargarProductos();
          },
          error: () => this.snackBar.open('Error al crear producto', 'Cerrar', { duration: 3000 })
        });
      }
    });
  }

  /** Abre el diálogo para editar un producto existente */
  editarProducto(item: Producto) {
    const dialogRef = this.dialog.open(ProductosDialogComponent, {
      width: '500px',
      data: { item: { ...item } }
    });
    dialogRef.afterClosed().subscribe((result: Producto | undefined) => {
      if (result) {
        const { codigo, ...productoSinCodigo } = result;
        this.productosService.actualizarProducto(item.codigo, productoSinCodigo).subscribe({
          next: () => {
            this.snackBar.open('Producto actualizado', 'Cerrar', { duration: 2500 });
            this.cargarProductos();
          },
          error: () => this.snackBar.open('Error al actualizar producto', 'Cerrar', { duration: 3000 })
        });
      }
    });
  }

  /** Elimina un producto */
  eliminarProducto(item: Producto) {
    const confirmDelete = confirm(`¿Eliminar el producto con código "${item.codigo}"?`);
    if (confirmDelete) {
      this.productosService.eliminarProducto(item.codigo).subscribe({
        next: () => {
          this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 2500 });
          this.cargarProductos();
        },
        error: () => this.snackBar.open('Error al eliminar producto', 'Cerrar', { duration: 3000 })
      });
    }
  }
} 