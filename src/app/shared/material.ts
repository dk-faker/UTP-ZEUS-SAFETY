// src/app/shared/material.ts
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule }    from '@angular/material/icon';
import { MatButtonModule }  from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule }    from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatCardModule }      from '@angular/material/card';
import { MatSnackBarModule }  from '@angular/material/snack-bar';
import { MatMenuModule }      from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule }    from '@angular/material/dialog'; // ← Nuevo
import { MatTableModule }     from '@angular/material/table';
import { MatTooltipModule }   from '@angular/material/tooltip'; // para tooltips en botones
import { MatNativeDateModule }        from '@angular/material/core'; // para usar Datepicker con Date nativo
import { MatSelectModule }    from '@angular/material/select';
import { MatDatepickerModule }        from '@angular/material/datepicker';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule, 
    MatTableModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule
  ]
})
export class MaterialModule { }