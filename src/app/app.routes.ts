// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './core/auth.guard';
import { ClientesComponent } from './features/clientes/clientes.component';
import { InventarioComponent } from './features/inventario/inventario.component';
import { VentasComponent } from './features/ventas/ventas.component';
import { ComprasComponent } from './features/compras/compras.component';
import { PersonalComponent } from './features/personal/personal.component';
import { ReportesComponent } from './features/reportes/reportes.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'clientes', component: ClientesComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'compras', component: ComprasComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: '', redirectTo: 'clientes', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
