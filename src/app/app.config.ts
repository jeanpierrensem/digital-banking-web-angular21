import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import { APP_CONFIG } from './config/app.config.token';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { appHttpInterceptor } from './interceptors/app-http-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
  provideHttpClient( withInterceptors([appHttpInterceptor])), 
   {
      provide: APP_CONFIG,
      useValue: {
        backendHost: 'http://localhost:9090',
        production: false
      }
    },
    
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(), 
    ReactiveFormsModule

  ]
};
