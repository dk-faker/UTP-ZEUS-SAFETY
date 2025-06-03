// src/app/features/clientes/clientes.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }      from '@angular/material/card';
import { MatTableModule }     from '@angular/material/table';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatTooltipModule }   from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MaterialModule } from '../../shared/material';
import { ClientesDialogComponent, Cliente } from './dialog/clientes-dialog.component';

@Component({
  selector: 'app-clientes',
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
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'ruc',
    'direccion',
    'telefono',
    'acciones'
  ];
  dataSource: Cliente[] = [];
  private nextId = 1;

  constructor(private dialog: MatDialog) {}

  /** Abre el diálogo para crear un nuevo cliente */
  nuevoCliente() {
    const dialogRef = this.dialog.open(ClientesDialogComponent, {
      width: '500px',
      data: {} as Partial<Cliente>
    });
    dialogRef.afterClosed().subscribe((result: Cliente | undefined) => {
      if (result) {
        result.id = this.nextId++;
        this.dataSource = [...this.dataSource, result];
      }
    });
  }

  /** Abre el diálogo para editar un cliente existente */
  editarCliente(item: Cliente) {
    const dialogRef = this.dialog.open(ClientesDialogComponent, {
      width: '500px',
      data: { item: { ...item } }
    });
    dialogRef.afterClosed().subscribe((result: Cliente | undefined) => {
      if (result) {
        this.dataSource = this.dataSource.map((c) =>
          c.id === result.id ? { ...result } : c
        );
      }
    });
  }

  /** Elimina un cliente */
  eliminarCliente(item: Cliente) {
    const confirmDelete = confirm(`¿Eliminar al cliente "${item.nombre}"?`);
    if (confirmDelete) {
      this.dataSource = this.dataSource.filter((c) => c.id !== item.id);
    }
  }
}
