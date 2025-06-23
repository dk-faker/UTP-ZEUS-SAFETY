import { Component,inject,ChangeDetectionStrategy} from '@angular/core';
import{ MatDialogTitle,
  MatDialogContent,MatDialogRef}from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-dialog-personal',
  imports: [MatDialogTitle, MatDialogContent,FormsModule, MatFormFieldModule, MatInputModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,
   MatSelectModule,MatButtonModule
  ],
  templateUrl: './dialog-personal.component.html',
  styleUrl: './dialog-personal.component.scss',
   providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPersonalComponent {
  constructor(private dialogRef: MatDialogRef<DialogPersonalComponent>) {}
cancelar(){
this.dialogRef.close();
  }
registrar(){
this.dialogRef.close();
}
}
