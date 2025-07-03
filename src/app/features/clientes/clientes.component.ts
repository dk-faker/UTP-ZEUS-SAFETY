// src/app/features/clientes/clientes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }      from '@angular/material/card';
import { MatTableModule }     from '@angular/material/table';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatTooltipModule }   from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MaterialModule } from '../../shared/material';
import { ClientesDialogComponent, Cliente } from './dialog/clientes-dialog.component';
import { ClientesService } from './clientes.service';

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
    MaterialModule,
    HttpClientModule
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'tipo_cliente',
    'ruc',
    'telefono',
    'lugar',
    'acciones'
  ];
  dataSource: Cliente[] = [];
  private nextId = 1;

  constructor(
    private dialog: MatDialog,
    private clientesService: ClientesService,
    private snackBar: MatSnackBar
  ) {}

  private cargarClientes() {
    this.clientesService.getClientes().subscribe({
      next: (clientes) => this.dataSource = clientes,
      error: (err) => {
        this.dataSource = [];
        this.snackBar.open('Error al cargar clientes', 'Cerrar', { duration: 3000 });
      }
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  /** Abre el diálogo para crear un nuevo cliente */
  nuevoCliente() {
    const dialogRef = this.dialog.open(ClientesDialogComponent, {
      width: '500px',
      data: {} as Partial<Cliente>
    });
    dialogRef.afterClosed().subscribe((result: Cliente | undefined) => {
      if (result) {
        const { id, ...clienteSinId } = result;
        this.clientesService.crearCliente(clienteSinId).subscribe({
          next: () => {
            this.snackBar.open('Cliente creado exitosamente', 'Cerrar', { duration: 2500 });
            this.cargarClientes();
          },
          error: () => this.snackBar.open('Error al crear cliente', 'Cerrar', { duration: 3000 })
        });
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
        const { id, ...clienteSinId } = result;
        this.clientesService.actualizarCliente(id, clienteSinId).subscribe({
          next: () => {
            this.snackBar.open('Cliente actualizado', 'Cerrar', { duration: 2500 });
            this.cargarClientes();
          },
          error: () => this.snackBar.open('Error al actualizar cliente', 'Cerrar', { duration: 3000 })
        });
      }
    });
  }

  /** Elimina un cliente */
  eliminarCliente(item: Cliente) {
    const confirmDelete = confirm(`¿Eliminar al cliente "${item.nombre}"?`);
    if (confirmDelete) {
      this.clientesService.eliminarCliente(item.id).subscribe({
        next: () => {
          this.snackBar.open('Cliente eliminado', 'Cerrar', { duration: 2500 });
          this.cargarClientes();
        },
        error: () => this.snackBar.open('Error al eliminar cliente', 'Cerrar', { duration: 3000 })
      });
    }
  }
}
