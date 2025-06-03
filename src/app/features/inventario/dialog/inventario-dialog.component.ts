// src/app/features/inventario/inventario-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../shared/material';  // <-- Importamos tu MaterialModule
// Interfaz para representar un ítem de inventario
export interface InventarioItem {
  id: number;
  producto: string;
  sku: string;
  categoria: string;
  cantidad: number;
  precioUnitario: number;
}

// Datos que podemos pasar al diálogo en caso de edición (opcional). En este ejemplo, lo usamos solo para crear uno nuevo.
export interface InventarioDialogData {
  item?: InventarioItem; // Si existiera, el diálogo cargaría la info para editar
}

@Component({
  selector: 'app-inventario-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule 
  ],
  templateUrl: './inventario-dialog.component.html',
  styleUrls: ['./inventario-dialog.component.scss']
})
export class InventarioDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InventarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventarioDialogData
  ) {
    // Creamos el formulario con validaciones básicas
    this.form = this.fb.group({
      producto: [data.item?.producto || '', [Validators.required, Validators.minLength(3)]],
      sku: [data.item?.sku || '', [Validators.required, Validators.minLength(3)]],
      categoria: [data.item?.categoria || '', Validators.required],
      cantidad: [data.item?.cantidad || 0, [Validators.required, Validators.min(0)]],
      precioUnitario: [data.item?.precioUnitario || 0, [Validators.required, Validators.min(0)]]
    });
  }

  // Cierra el diálogo sin enviar datos
  onCancel() {
    this.dialogRef.close();
  }

  // Valida el formulario y cierra enviando los valores al componente padre
  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Construimos el objeto InventarioItem. 
    // Si data.item existe, mantenemos el mismo ID para edición; si no, el padre asignará uno nuevo.
    const result: InventarioItem = {
      id: this.data.item?.id ?? 0, // si es edición, mantiene id; si es creación, el padre asignará un id válido
      producto: this.form.value.producto,
      sku: this.form.value.sku,
      categoria: this.form.value.categoria,
      cantidad: this.form.value.cantidad,
      precioUnitario: this.form.value.precioUnitario
    };

    this.dialogRef.close(result);
  }
}
