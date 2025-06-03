import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,               // <-- importante
  imports: [RouterOutlet],         // <-- para poder usar <router-outlet>
  template: `<router-outlet></router-outlet>`, // muestra la ruta activa
  styleUrls: ['./app.component.scss']  // nota el plural correctísimo
})
export class AppComponent {}
