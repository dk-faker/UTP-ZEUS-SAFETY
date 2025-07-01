// src/app/features/personal/personal.component.ts
import { Component,AfterViewInit,ViewChild,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {DialogPersonalComponent} from './dialog-personal/dialog-personal.component';
@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dni','fechana','genero','area','estado','ingreso','acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  dialog = inject(MatDialog);
  registrar(){
    this.dialog.open(DialogPersonalComponent , {
      
    });
  }
  editar(){
    this.dialog.open(DialogPersonalComponent,{})
  }
  eliminar(){

  }
}
export interface PeriodicElement {
  id:number;
  nombres: string;
  apellidos: string;
  dni: number;
  fechana: string;
  genero:string;
  area:string;
  estado:string;
  ingreso:String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, nombres: 'atwa', apellidos: 'garcia', dni: 1245789,fechana:'14-02-25',genero:'M',area:'prueba',estado:'Activo',ingreso:'10-01-23'},
  {id: 2, nombres: 'carlos', apellidos: 'tapia', dni: 1245789,fechana:'10-02-25',genero:'M',area:'prueba',estado:'Cesado',ingreso:'10-01-23'}
  
];
