import { Injectable } from "@angular/core";
import { SessionEntity } from "../../../auth/domain/entities/session.entity";
import { ContextStorageStrategy, StorageStrategies } from "../../infrastructure/adapters/context-strategy-storage.service";

@Injectable() 
export class GetSessionFromStorageUseCase {
 
  constructor(
    private storageService: ContextStorageStrategy,
  ) { }
  execute():SessionEntity | null { 
    const session = this.storageService
      .use(StorageStrategies.LOCAL)
      .get<SessionEntity>('user-data')
    return session
  }
}
