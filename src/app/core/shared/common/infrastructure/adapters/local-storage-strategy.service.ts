import { Injectable } from "@angular/core";
import { StrategyStoragePort } from "../../application/ports/strategy-storage.port";

@Injectable({
    providedIn:'root'
})
export class LoacalStorageStrategy implements StrategyStoragePort{
    get<T>(key: string): T | null {
        try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
        } catch {
        return null;
        }
    }
    set(key: string, value: unknown): boolean {
        try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
        } catch {
        return false;
        }
    }
    remove(key: string): void {
        localStorage.removeItem(key);
    }
    clear(): void {
        localStorage.clear();
    }
}