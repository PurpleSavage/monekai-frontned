import { Component, inject, OnInit, signal } from "@angular/core";
import {LucideCoins,LucideBell,LucideSettings} from '@lucide/angular';
import { GetSessionFromStorageUseCase } from "../../../application/use-cases/get-session-from-storage.use-case";
import { SessionEntity } from "../../../../auth/domain/entities/session.entity";

@Component({
  standalone: true, // 👈 ¡SIEMPRE ponlo en la primera línea!
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  imports: [LucideBell, LucideCoins, LucideSettings],
  providers: [GetSessionFromStorageUseCase],
})
export class SharedHeaderComponent implements OnInit {
  public session = inject(GetSessionFromStorageUseCase)

  public sessionData = signal<SessionEntity | null>(null)
  ngOnInit(): void {
    this.sessionData.set(this.session.execute())
  }
  
} 