// src/app/features/compras/compras-dialog.component.ts
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

/** Interfaz que representa una compra */
export interface Compra {
  id: number;
  fecha: Date;
  proveedor: string;
  total: number;
  estado: 'Pendiente' | 'Recibida' | 'Cancelada';
}

/** Datos que puede recibir el diálogo (para editar) */
export interface ComprasDialogData {
  item?: Compra;
}

@Component({
  selector: 'app-compras-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule // Trae todos los módulos de Material necesarios
  ],
  templateUrl: './compras-dialog.component.html',
  styleUrls: ['./compras-dialog.component.scss']
})
export class ComprasDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ComprasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ComprasDialogData
  ) {
    this.form = this.fb.group({
      fecha: [data.item?.fecha || new Date(), Validators.required],
      proveedor: [
        data.item?.proveedor || '',
        [Validators.required, Validators.minLength(3)]
      ],
      total: [data.item?.total || 0, [Validators.required, Validators.min(0.01)]],
      estado: [data.item?.estado || 'Pendiente', Validators.required]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const result: Compra = {
      id: this.data.item?.id ?? 0,
      fecha: this.form.value.fecha,
      proveedor: this.form.value.proveedor,
      total: this.form.value.total,
      estado: this.form.value.estado
    };
    this.dialogRef.close(result);
  }
}
