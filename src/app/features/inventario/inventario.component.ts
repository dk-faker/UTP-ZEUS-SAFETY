// src/app/features/inventario/inventario.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }      from '@angular/material/card';
import { MatTableModule }     from '@angular/material/table';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { InventarioDialogComponent, InventarioItem } from './dialog/inventario-dialog.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent {
  displayedColumns: string[] = [
    'id',
    'producto',
    'sku',
    'categoria',
    'cantidad',
    'precioUnitario',
    'acciones'
  ];

  dataSource: InventarioItem[] = [];

  private nextId = 1; // Llevamos un contador simple de ID para los items nuevos

  constructor(private dialog: MatDialog) {}

  /** Abre el diálogo para crear un nuevo ítem */
  nuevoItem() {
    const dialogRef = this.dialog.open(InventarioDialogComponent, {
      width: '500px',
      data: {} // No enviamos item porque es creación
    });

    dialogRef.afterClosed().subscribe((result: InventarioItem | undefined) => {
      if (result) {
        // Asignamos un ID único
        result.id = this.nextId++;
        this.dataSource = [...this.dataSource, result];
      }
    });
  }

  /** Abre el diálogo para editar un ítem existente */
  editarItem(item: InventarioItem) {
    const dialogRef = this.dialog.open(InventarioDialogComponent, {
      width: '500px',
      data: { item: { ...item } } // enviamos una copia para no mutar directamente
    });

    dialogRef.afterClosed().subscribe((result: InventarioItem | undefined) => {
      if (result) {
        // Reemplazamos el ítem editado en dataSource
        this.dataSource = this.dataSource.map(old =>
          old.id === result.id ? { ...result } : old
        );
      }
    });
  }

  /** Elimina un ítem de la tabla */
  eliminarItem(item: InventarioItem) {
    // Confirmación simple (puedes usar MatDialog ó MatSnackBar para mejores alerts)
    const confirmDelete = confirm(`¿Seguro que deseas eliminar "${item.producto}"?`);
    if (confirmDelete) {
      this.dataSource = this.dataSource.filter(x => x.id !== item.id);
    }
  }
}
