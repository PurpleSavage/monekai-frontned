import { Component, inject, OnInit, signal } from "@angular/core";
import {LucideCoins,LucideBell,LucideSettings} from '@lucide/angular';
import { GetSessionFromStorageUseCase } from "../../../application/use-cases/get-session-from-storage.use-case";
import { UserEntity } from "../../../../auth/domain/entities/user.entity";
import { NotificationListenerWrapperComponent } from "../../../../../aggregates/notifications/ui/components/notification-listener-wrapper/notification-listener-wrapper.component";

@Component({
  standalone: true,
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  imports: [
    LucideBell,
    LucideCoins,
    LucideSettings,
    NotificationListenerWrapperComponent
  ],
  providers: [],
})
export class SharedHeaderComponent implements OnInit {
  public userFromStorage = inject(GetSessionFromStorageUseCase)

  public userData = signal<UserEntity | null>(null)
  ngOnInit(): void {
    const userData = this.userFromStorage.execute()
    if (userData) { 
      this.userData.set(userData) 
    }
  }
  
} 