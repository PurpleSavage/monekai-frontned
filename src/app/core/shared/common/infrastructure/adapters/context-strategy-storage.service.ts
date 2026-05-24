import { Injectable } from "@angular/core"
import { inject } from "@angular/core/primitives/di"
import { LocalStorageStrategy } from "./local-storage-strategy.service"
import { SessionStorageStrategy } from "./session-storage-strategy.service"
import { StrategyStoragePort } from "../../application/ports/strategy-storage.port"

export const StorageStrategies = {
    LOCAL:'local',
    SESSION:'session'
} as const 

export type StorageStrategiesType= typeof StorageStrategies[keyof typeof StorageStrategies]

@Injectable({
    providedIn:'root'
})
export class ContextStorageStrategy{
    private local = inject(LocalStorageStrategy)
    private session = inject(SessionStorageStrategy)
    private activeStrategy: StrategyStoragePort = this.local
    use(type:StorageStrategiesType): this {
        this.activeStrategy = type === StorageStrategies.LOCAL ? this.local : this.session;
        return this;
    }
    get<T>(key: string): T | null  {
       return this.activeStrategy.get(key)
    }
    set(key: string, value: unknown): boolean {
      return this.activeStrategy.set(key,value)
    }
    remove(key: string): void {
      this.activeStrategy.remove(key)
    }
    clear(): void {
      this.activeStrategy.clear()
    }
}