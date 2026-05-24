import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiBaseUrlInterceptor } from './core/framewrok-utilities/interceptors/api-base-url.interceptor';
import { AuthHttp } from './core/shared/auth/infrastructure/http/auth-http.service';
import { AuthPort } from './core/shared/auth/application/ports/auth.port';
import { LoginWithGoogleUseCase } from './core/shared/auth/application/use-cases/login-with-google.use-case';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiBaseUrlInterceptor])
    ),
    LoginWithGoogleUseCase,
    { provide: AuthPort, useClass: AuthHttp}
  ]
};
