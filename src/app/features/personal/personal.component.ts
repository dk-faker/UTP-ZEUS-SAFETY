// src/app/features/personal/personal.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card'; // <-- AGREGA ESTA LÍNEA
import { PersonalService, Personal } from './personal.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonalDialogComponent } from './dialog/personal-dialog.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, MatTableModule, HttpClientModule, MatCardModule, MatIconModule, MatDialogModule, PersonalDialogComponent],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'rol',
    'nombre_usuario',
    'clave',
    'id_rol',
    'fecha_creacion',
    'acciones'
  ];
  dataSource: Personal[] = [];

  constructor(
    private personalService: PersonalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  private cargarPersonal() {
    this.personalService.getPersonal().subscribe({
      next: (personal) => this.dataSource = personal,
      error: () => {
        this.dataSource = [];
        this.snackBar.open('Error al cargar personal', 'Cerrar', { duration: 3000 });
      }
    });
  }

  ngOnInit() {
    this.cargarPersonal();
  }

  nuevoPersonal() {
    const dialogRef = this.dialog.open(PersonalDialogComponent, {
      width: '500px',
      data: {} as any
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.personalService.crearPersonal(result).subscribe({
          next: () => {
            this.snackBar.open('Personal creado exitosamente', 'Cerrar', { duration: 2500 });
            this.cargarPersonal();
          },
          error: () => this.snackBar.open('Error al crear personal', 'Cerrar', { duration: 3000 })
        });
      }
    });
  }

  editarPersonal(item: any) {
    const dialogRef = this.dialog.open(PersonalDialogComponent, {
      width: '500px',
      data: { item: { ...item } }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.personalService.actualizarPersonal(item.id, result).subscribe({
          next: () => {
            this.snackBar.open('Personal actualizado', 'Cerrar', { duration: 2500 });
            this.cargarPersonal();
          },
          error: () => this.snackBar.open('Error al actualizar personal', 'Cerrar', { duration: 3000 })
        });
      }
    });
  }

  eliminarPersonal(item: any) {
    const confirmDelete = confirm(`¿Eliminar al usuario "${item.nombre_usuario}"?`);
    if (confirmDelete) {
      this.personalService.eliminarPersonal(item.id).subscribe({
        next: () => {
          this.snackBar.open('Personal eliminado', 'Cerrar', { duration: 2500 });
          this.cargarPersonal();
        },
        error: () => this.snackBar.open('Error al eliminar personal', 'Cerrar', { duration: 3000 })
      });
    }
  }
}
