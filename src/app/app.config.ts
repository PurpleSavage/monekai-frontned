import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiBaseUrlInterceptor } from './core/framewrok-utilities/interceptors/api-base-url.interceptor';
import { AuthHttp } from './core/shared/auth/infrastructure/http/auth-http.service';
import { AuthPort } from './core/shared/auth/application/ports/auth.port';
import { LoginWithGoogleUseCase } from './core/shared/auth/application/use-cases/login-with-google.use-case';
import { AuthStateManager } from './core/shared/auth/state-manager/auth-state.service';
import { GetSessionFromStorageUseCase } from './core/shared/common/application/use-cases/get-session-from-storage.use-case';
import { GetNewTokenUseCase } from './core/shared/auth/application/use-cases/get-new-token.use-case';
import { refreshTokenInterceptor } from './core/framewrok-utilities/interceptors/refreshtoken.interceptor';
import { AudioStateService } from './core/sampler/state-manager/audio-state.service';
import { MetadataPersistencePort } from './core/shared/common/application/ports/metadata-persistence.port';
import { MetadataPersistenceService } from './core/shared/common/infrastructure/persistence/metadata-persistence.service';
import { ListSamplesUseCase } from './core/sampler/application/use-cases/list-samples.use-case';
import { SamplerPersistencePort } from './core/sampler/application/ports/sampler-persistence.port';
import { SamplerPersistenceService } from './core/sampler/infrastructure/persistence/sampler-persistence.service';
import { SamplerHttpService } from './core/sampler/infrastructure/http/sampler-http.service';
import { SamplerPort } from './core/sampler/application/ports/sampler.port';
import { GenerateSampleUseCase } from './core/sampler/application/use-cases/generate-sample.use-case';
import { AudioEditStateService } from './core/sampler/state-manager/audio-edit-state.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor, refreshTokenInterceptor])),
    AuthStateManager,
    GetSessionFromStorageUseCase,
    GetNewTokenUseCase,
    LoginWithGoogleUseCase,
    AudioStateService,
    AudioEditStateService,
    ListSamplesUseCase,
    {provide: SamplerPersistencePort,useClass: SamplerPersistenceService},
    {provide: SamplerPort,useClass:SamplerHttpService},
    {provide: AuthPort, useClass: AuthHttp },
    {provide:MetadataPersistencePort,useClass:MetadataPersistenceService}
  ],
};
