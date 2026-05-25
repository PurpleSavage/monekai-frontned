import { Injectable } from "@angular/core";
import { AuthPort } from "../ports/auth.port";
import { Observable, tap } from "rxjs";
import { ContextStorageStrategy, StorageStrategies } from "../../../common/infrastructure/adapters/context-strategy-storage.service";
import { SessionEntity } from "../../domain/entities/session.entity";
import { AuthStateManager } from "../../state-manager/auth-state.service";

@Injectable({
  providedIn: 'root'
})
export class GetProfileUseCase {
  constructor(
    private authService: AuthPort,
    private storageService: ContextStorageStrategy,
    private authStateManager: AuthStateManager,
  ) { }
  execute(): Observable<SessionEntity> { 
    return this.authService.getProfile().pipe(
      tap((data) => { 
        const dataStorage = {
          id: data.userData.id,
          email: data.userData.email,
          photoUrl: data.userData.photoUrl,
          createdAt: data.userData.createdAt,
          credits: data.userData.credits,
          hasAvatar: data.userData.hasAvatar,
        }
        this.authStateManager.setSession(data);
        this.storageService
          .use(StorageStrategies.LOCAL)
          .set('user-data', dataStorage)
      })
    )
  }
}
