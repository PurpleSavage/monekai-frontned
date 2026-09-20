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
import { AudioEditStateService } from './core/sampler/state-manager/audio-edit-state.service';
import { SaveSampleUseCase } from './core/sampler/application/use-cases/save-sample.use-case';
import { CommunityPort } from './core/aggregates/community/application/ports/community.port';
import { CommunityHttpService } from './core/aggregates/community/infrastructure/http/community-http.service';
import { ListLatestSharedSamplesUseCase } from './core/aggregates/community/application/use-cases/list-latest-shared-samples.use-case';
import { ListLatestSharedEditSamplesUseCase } from './core/aggregates/community/application/use-cases/list-latest-shared-edit-samples.use-case';
import { LatestSamplesStateService } from './core/aggregates/community/state-manager/latest-samples-state.service';
import { ListCommunitySharedEditSamplesUseCase } from './core/aggregates/community/application/use-cases/list-community-shared-edit-samples.use-case';
import { ListCommunitySharedSamplesUseCase } from './core/aggregates/community/application/use-cases/list-community-shared-samples.use-case';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor, refreshTokenInterceptor])),
    AuthStateManager,
    GetSessionFromStorageUseCase,
    LatestSamplesStateService,
    GetNewTokenUseCase,
    LoginWithGoogleUseCase,
    AudioStateService,
    AudioEditStateService,
    ListSamplesUseCase,
    SaveSampleUseCase,
    ListCommunitySharedEditSamplesUseCase,
    ListCommunitySharedSamplesUseCase,
    {provide: SamplerPersistencePort,useClass: SamplerPersistenceService},
    {provide: SamplerPort,useClass:SamplerHttpService},
    {provide: AuthPort, useClass: AuthHttp },
    {provide:MetadataPersistencePort,useClass:MetadataPersistenceService},
    {provide: CommunityPort, useClass: CommunityHttpService},
    ListLatestSharedSamplesUseCase,
    ListLatestSharedEditSamplesUseCase
  ],
};
