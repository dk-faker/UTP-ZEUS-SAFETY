import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material';

export interface PersonalDialogData {
  item?: any;
}

@Component({
  selector: 'app-personal-dialog',
  templateUrl: './personal-dialog.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  styleUrls: ['./personal-dialog.component.scss']
})
export class PersonalDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonalDialogData
  ) {
    this.form = this.fb.group({
      nombre_usuario: [data.item?.nombre_usuario || '', [Validators.required, Validators.minLength(3)]],
      clave: [data.item?.clave || '', [Validators.required, Validators.minLength(3)]],
      id_rol: [data.item?.id_rol || '', Validators.required]
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
    const result = {
      ...this.data.item,
      ...this.form.value
    };
    this.dialogRef.close(result);
  }
} 