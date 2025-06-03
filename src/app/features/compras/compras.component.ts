// src/app/features/compras/compras.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }      from '@angular/material/card';
import { MatTableModule }     from '@angular/material/table';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatTooltipModule }   from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MaterialModule } from '../../shared/material';
import { ComprasDialogComponent, Compra } from './dialog/compras-dialog.component';

@Component({
  selector: 'app-compras',
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
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent {
  displayedColumns: string[] = [
    'id',
    'fecha',
    'proveedor',
    'total',
    'estado',
    'acciones'
  ];
  dataSource: Compra[] = [];
  private nextId = 1;

  constructor(private dialog: MatDialog) {}

  /** Abre el diálogo para crear una nueva compra */
  nuevaCompra() {
    const dialogRef = this.dialog.open(ComprasDialogComponent, {
      width: '500px',
      data: {} as Partial<Compra>
    });
    dialogRef.afterClosed().subscribe((result: Compra | undefined) => {
      if (result) {
        result.id = this.nextId++;
        this.dataSource = [...this.dataSource, result];
      }
    });
  }

  /** Abre el diálogo para editar una compra existente */
  editarCompra(item: Compra) {
    const dialogRef = this.dialog.open(ComprasDialogComponent, {
      width: '500px',
      data: { item: { ...item } }
    });
    dialogRef.afterClosed().subscribe((result: Compra | undefined) => {
      if (result) {
        this.dataSource = this.dataSource.map((c) =>
          c.id === result.id ? { ...result } : c
        );
      }
    });
  }

  /** Elimina una compra */
  eliminarCompra(item: Compra) {
    const confirmDelete = confirm(`¿Eliminar la compra #${item.id}?`);
    if (confirmDelete) {
      this.dataSource = this.dataSource.filter((c) => c.id !== item.id);
    }
  }
}
