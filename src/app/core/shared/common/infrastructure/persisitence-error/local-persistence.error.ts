export interface LocalPersistenceErrorPayload {
  title: string;
  message: string;
  details?: Record<string, string>;
}

export class LocalPersistenceError extends Error {
  public readonly title: string;
  public readonly details?: Record<string, string>;

  constructor(payload: LocalPersistenceErrorPayload) {
    // Pasamos el mensaje directamente al constructor nativo de JavaScript Error
    super(payload.message); 
    
    this.name = 'LocalPersistenceError';
    this.title = payload.title;
    this.details = payload.details;

    // Restauramos el prototipo de forma explícita (Buenas prácticas en TypeScript al extender Error)
    Object.setPrototypeOf(this, LocalPersistenceError.prototype);
  }

  /**
   * Factory method to map Dexie/IndexedDB raw exceptions into this frontend error
   */
  static fromDexieError(error: any, contextMessage: string): LocalPersistenceError {
    const errorName = error?.name ?? 'UnknownStorageError';
    const rawMessage = error?.message ?? 'An unexpected error occurred in IndexedDB.';
    
    return new LocalPersistenceError({
      title: `Local Storage Failure (${errorName})`,
      message: `${contextMessage}: ${rawMessage}`,
      details: {
        dexieErrorName: errorName,
        stack: error?.stack ?? ''
      }
    });
  }
}