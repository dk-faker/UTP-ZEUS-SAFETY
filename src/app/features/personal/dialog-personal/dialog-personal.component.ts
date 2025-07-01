import { Component,ChangeDetectionStrategy,Inject} from '@angular/core';
import{ MatDialogTitle,
  MatDialogContent,MatDialogRef,MAT_DIALOG_DATA}from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog-personal',
  imports: [MatDialogTitle, MatDialogContent,FormsModule, MatFormFieldModule, MatInputModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,
   MatSelectModule,MatButtonModule,ReactiveFormsModule
  ],
  templateUrl: './dialog-personal.component.html',
  styleUrl: './dialog-personal.component.scss',
   providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPersonalComponent {
  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<DialogPersonalComponent>,private fb: FormBuilder ,@Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.form = this.fb.group({
    id: [data?.id || null],
    nombres: [data?.nombres || ''],
    apellidos: [data?.apellidos || ''],
    dni: [data?.dni || ''],
    fechana: [data?.fechana || ''],
    genero: [this.data?.genero ?? null],
    area: [data?.area || ''],
    estado: [this.data?.estado ?? null],
    ingreso: [data?.ingreso || '']
  });
  }
cancelar(){ 
  this.dialogRef.close();
  }
registrar(){
 if (this.form.valid) {
      this.dialogRef.close(this.form.value); 
    }
}
}
