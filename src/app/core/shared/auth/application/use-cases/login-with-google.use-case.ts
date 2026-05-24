import { Injectable } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { AuthPort } from "../ports/auth.port";
import { Observable, tap } from "rxjs";
import { SessionEntity } from "../../domain/entities/session.entity";
import { GoogleAuthDto } from "../dtos/requests/google-auth.dto";
import { ContextStorageStrategy, StorageStrategies } from "../../../common/infrastructure/adapters/context-strategy-storage.service";

@Injectable()
export class LoginWithGoogleUseCase { 
  constructor(
    private authService: AuthPort,
    private storageService: ContextStorageStrategy
  ) {}
  
  execute(dto:GoogleAuthDto):Observable<SessionEntity> { 
    return this.authService.loginWithGoogle(dto).pipe(
      tap((data) => {
        const dataStorage = {
          id: data.userData.id,
          email: data.userData.email,
          photoUrl: data.userData.photoUrl,
          createdAt: data.userData.createdAt,
          credits: data.userData.credits,
          hasAvatar: data.userData.hasAvatar,
        }
        this.storageService
          .use(StorageStrategies.LOCAL)
          .set('user-data', dataStorage)
      })
    )
  
  }
}