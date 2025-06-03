// src/app/app.config.ts
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { appRoutes } from './app.routes';
import { AuthService } from './core/auth.service';
import { MaterialModule } from './shared/material';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(BrowserAnimationsModule, MatNativeDateModule,MaterialModule),
    AuthService
  ]
};
