import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material';

export interface Producto {
  codigo: string;
  categoria: string;
  tipo: string;
  color_tipo: string;
  tamano: string;
  pares_por_caja: number;
}

export interface ProductosDialogData {
  item?: Producto;
}

@Component({
  selector: 'app-productos-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './productos-dialog.component.html',
  styleUrls: ['./productos-dialog.component.scss']
})
export class ProductosDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductosDialogData
  ) {
    this.form = this.fb.group({
      codigo: [data.item?.codigo || '', [Validators.required]],
      categoria: [data.item?.categoria || '', Validators.required],
      tipo: [data.item?.tipo || '', Validators.required],
      color_tipo: [data.item?.color_tipo || '', Validators.required],
      tamano: [data.item?.tamano || '', Validators.required],
      pares_por_caja: [data.item?.pares_por_caja || 0, [Validators.required, Validators.min(1)]]
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
    const result: Producto = {
      codigo: this.form.value.codigo,
      categoria: this.form.value.categoria,
      tipo: this.form.value.tipo,
      color_tipo: this.form.value.color_tipo,
      tamano: this.form.value.tamano,
      pares_por_caja: this.form.value.pares_por_caja
    };
    this.dialogRef.close(result);
  }
} 