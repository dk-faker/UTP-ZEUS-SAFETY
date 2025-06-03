// src/app/features/ventas/ventas.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }      from '@angular/material/card';
import { MatTableModule }     from '@angular/material/table';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatTooltipModule }   from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MaterialModule } from '../../shared/material';
import { Venta, VentasDialogComponent } from './dialog/ventas-dialog.component';


@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MaterialModule
  ],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent {
  displayedColumns: string[] = [
    'id',
    'fecha',
    'cliente',
    'total',
    'estado',
    'acciones'
  ];

  dataSource: Venta[] = [];
  private nextId = 1;

  constructor(private dialog: MatDialog) {}

  /** Abre el diálogo para crear una nueva venta */
  nuevaVenta() {
    const dialogRef = this.dialog.open(VentasDialogComponent, {
      width: '500px',
      data: {} as Partial<Venta> // no enviamos item, pues es creación
    });

    dialogRef.afterClosed().subscribe((result: Venta | undefined) => {
      if (result) {
        // Asignamos ID único y agregamos al dataSource
        result.id = this.nextId++;
        this.dataSource = [...this.dataSource, result];
      }
    });
  }

  /** Abre el diálogo para editar una venta existente */
  editarVenta(venta: Venta) {
    const dialogRef = this.dialog.open(VentasDialogComponent, {
      width: '500px',
      data: { item: { ...venta } } // enviamos una copia para edición
    });

    dialogRef.afterClosed().subscribe((result: Venta | undefined) => {
      if (result) {
        // Reemplazamos la venta editada en el array
        this.dataSource = this.dataSource.map(v =>
          v.id === result.id ? { ...result } : v
        );
      }
    });
  }

  /** Elimina una venta */
  eliminarVenta(venta: Venta) {
    const confirmDelete = confirm(`¿Eliminar la venta #${venta.id}?`);
    if (confirmDelete) {
      this.dataSource = this.dataSource.filter(v => v.id !== venta.id);
    }
  }
}
