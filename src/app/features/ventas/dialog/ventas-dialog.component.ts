// src/app/features/ventas/ventas-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material';

/**
 * Interfaz que representa una venta.
 * El componente padre (VentasComponent) asignará el `id`.
 */
export interface Venta {
  id: number;
  fecha: Date;
  cliente: string;
  total: number;
  estado: 'Pendiente' | 'Completada' | 'Cancelada';
}

/**
 * Datos que podemos enviar al diálogo cuando editamos.
 * Para creación, data.item será undefined.
 */
export interface VentasDialogData {
  item?: Venta;
}

@Component({
  selector: 'app-ventas-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule // <-- Traemos todos los módulos de Material si ya los agrupaste
  ],
  templateUrl: './ventas-dialog.component.html',
  styleUrls: ['./ventas-dialog.component.scss']
})
export class VentasDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VentasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VentasDialogData
  ) {
    // Si data.item existe, estamos en modo “editar” y precargamos; de lo contrario, es creación.
    this.form = this.fb.group({
      fecha: [data.item?.fecha || new Date(), Validators.required],
      cliente: [data.item?.cliente || '', [Validators.required, Validators.minLength(3)]],
      total: [data.item?.total || 0, [Validators.required, Validators.min(0.01)]],
      estado: [data.item?.estado || 'Pendiente', Validators.required]
    });
  }

  // Cierra el diálogo sin devolver nada
  onCancel() {
    this.dialogRef.close();
  }

  // Si el formulario es válido, cierra retornando el objeto Venta (sin id)
  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const result: Venta = {
      id: this.data.item?.id ?? 0, // si es edición, mantiene id; si no, el padre asignará uno propio
      fecha: this.form.value.fecha,
      cliente: this.form.value.cliente,
      total: this.form.value.total,
      estado: this.form.value.estado
    };

    this.dialogRef.close(result);
  }
}
