export abstract class StrategyStoragePort {
  abstract get<T>(key: string): T | null;
  abstract set(key: string, value: unknown): boolean;
  abstract remove(key: string): void;
  abstract clear(): void;
}