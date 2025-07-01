// src/app/features/personal/personal.component.ts
import { Component} from '@angular/core';
import { CommonModule ,formatDate} from '@angular/common';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  MatDialog,
 
} from '@angular/material/dialog';
import {DialogPersonalComponent} from './dialog-personal/dialog-personal.component';
@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent  {
  personal: any[] = [];
  dataSource = new MatTableDataSource<any>(this.personal);
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dni','fechana','genero','area','estado','ingreso','acciones'];
  idContador = 1;
  
  constructor(private dialogo: MatDialog) {}
  
  
  registrar(){
    const dialogRef = this.dialogo.open(DialogPersonalComponent);

    dialogRef.afterClosed().subscribe((registro) => {
      if (registro) {
        registro.id = this.idContador++;

        registro.estado = parseInt(registro.estado);
        registro.genero = parseInt(registro.genero);

        registro.fechana = formatDate(registro.fechana, 'dd-MM-yy', 'en-US');
        registro.ingreso = formatDate(registro.ingreso, 'dd-MM-yy', 'en-US');

        this.personal.push(registro);
        this.dataSource.data = [...this.personal]; 
      }
    });
  }
  editar(element: any) {
     const elementoConvertido = {
    ...element,
    fechana: this.convertirFechaStringADate(element.fechana),
    ingreso: this.convertirFechaStringADate(element.ingreso),

    estado: Number(element.estado),  
    genero: Number(element.genero) 
  };

  const dialogoEd = this.dialogo.open(DialogPersonalComponent, {
    data:  elementoConvertido 
  });

  dialogoEd.afterClosed().subscribe((registroEd) => {
    if (registroEd) {

      registroEd.estado = Number(registroEd.estado);
      registroEd.genero = Number(registroEd.genero);

      registroEd.fechana = formatDate(registroEd.fechana, 'dd-MM-yy', 'en-US');
      registroEd.ingreso = formatDate(registroEd.ingreso, 'dd-MM-yy', 'en-US');

      const index = this.personal.findIndex(p => p.id === registroEd.id);
      if (index !== -1) {
        this.personal[index] = registroEd;
        this.dataSource.data = [...this.personal]; 
      }
    }
  });
}
convertirFechaStringADate(fechaString: string): Date | null {
  const partes = fechaString.split('-');
  if (partes.length === 3) {
    const [dia, mes, anio] = partes.map(part => parseInt(part, 10));
    return new Date(anio, mes - 1, dia);
  }
  return null;
}

  eliminar(element: any) {
    this.personal = this.personal.filter(p => p.id !== element.id);
    this.dataSource.data = [...this.personal];
  }

  
  NombreEstado(estado: number): string {
  switch (estado) {
    case 1:
      return 'Activo';
    case 2:
      return 'Inactivo';
    case 3:
      return 'Cesado';
    default:
      return 'Desconocido';
  }
}
Genero(genero:number):string{
  switch (genero) {
    case 1:
      return 'Masculino';
    case 2:
      return 'Femenino';
    default:
      return 'Desconocido';
  }
}
}
