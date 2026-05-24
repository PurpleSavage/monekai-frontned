import { Injectable } from "@angular/core";
import { AuthPort } from "../ports/auth.port";
import { inject } from "@angular/core/primitives/di";
import { Observable, tap } from "rxjs";
import { ContextStorageStrategy, StorageStrategies } from "../../../common/infrastructure/adapters/context-strategy-storage.service";
import { SessionEntity } from "../../domain/entities/session.entity";

@Injectable({
  providedIn: 'root'
})
export class GetProfileUseCase {
  private authService = inject(AuthPort)
  private storageService = inject(ContextStorageStrategy)
  
  execute(): Observable<SessionEntity> { 
    return this.authService.getProfile().pipe(
      tap((data) => { 
        const dataStorage = {
          id: data.userData.id,
          email: data.userData.email,
          photoUrl: data.userData.photoUrl,
          createdAt: data.userData.createdAt,
          credits: data.userData.credits,
        }
        this.storageService
          .use(StorageStrategies.LOCAL)
          .set('userData', dataStorage)
      })
    )
  }
}
