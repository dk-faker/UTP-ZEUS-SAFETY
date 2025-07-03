// src/app/features/clientes/clientes-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material';

/** Interfaz que representa un cliente */
export interface Cliente {
  id: number;
  nombre: string;
  tipo_cliente: string;
  ruc: string;
  telefono: string;
  lugar: string;
}

/** Datos que el diálogo puede recibir (para editar) */
export interface ClientesDialogData {
  item?: Cliente;
}

@Component({
  selector: 'app-clientes-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule // Trae todos los módulos de Material necesarios
  ],
  templateUrl: './clientes-dialog.component.html',
  styleUrls: ['./clientes-dialog.component.scss']
})
export class ClientesDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientesDialogData
  ) {
    // Si data.item existe, precargamos para editar; si no, es creación
    this.form = this.fb.group({
      nombre: [data.item?.nombre || '', [Validators.required, Validators.minLength(3)]],
      tipo_cliente: [data.item?.tipo_cliente || '', Validators.required],
      ruc: [data.item?.ruc || '', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      telefono: [data.item?.telefono || '', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      lugar: [data.item?.lugar || '', Validators.required]
    });
  }

  // Cierra el diálogo sin devolver nada
  onCancel() {
    this.dialogRef.close();
  }

  // Si el formulario es válido, cierra devolviendo el objeto Cliente (sin id)
  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const result: Cliente = {
      id: this.data.item?.id ?? 0,
      nombre: this.form.value.nombre,
      tipo_cliente: this.form.value.tipo_cliente,
      ruc: this.form.value.ruc,
      telefono: this.form.value.telefono,
      lugar: this.form.value.lugar
    };
    this.dialogRef.close(result);
  }
}
