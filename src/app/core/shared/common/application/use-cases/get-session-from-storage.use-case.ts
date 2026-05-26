import { Injectable } from "@angular/core";
import { ContextStorageStrategy, StorageStrategies } from "../../infrastructure/adapters/context-strategy-storage.service";
import { UserEntity } from "../../../auth/domain/entities/user.entity";

@Injectable() 
export class GetSessionFromStorageUseCase {
 
  constructor(
    private storageService: ContextStorageStrategy,
  ) { }
  execute():UserEntity | null { 
    const session = this.storageService
      .use(StorageStrategies.LOCAL)
      .get<UserEntity>('user-data')
    return session
  }
}
