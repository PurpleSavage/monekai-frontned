import { Injectable } from "@angular/core";
import { StrategyStoragePort } from "../../application/ports/strategy-storage.port";

@Injectable({
    providedIn:'root'
})
export class SessionStorageStrategy implements StrategyStoragePort{
     get<T>(key: string): T | null  {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set(key: string, value: unknown): boolean {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}