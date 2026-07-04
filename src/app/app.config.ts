import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from '@angular/common/http'
import { APP_CONFIG } from './config/app.config.token';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
   {
      provide: APP_CONFIG,
      useValue: {
        bankendHost: 'http://localhost:9090',
        production: false
      }
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(), 
    ReactiveFormsModule

  ]
};
