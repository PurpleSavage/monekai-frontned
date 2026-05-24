export interface BackendErrorPayload {
  title: string;     // 👈 Cambiado a minúscula
  message: string;   // 👈 Cambiado a minúscula
  status: number;    // 👈 Cambiado a minúscula
  details?: Record<string, string>;
}

export class AppBaseError extends Error {
  public readonly title: string;
  public readonly status: number;
  public readonly details?: Record<string, string>;

  constructor(payload: BackendErrorPayload) {
    // Pasamos el message (en minúscula) al constructor base
    super(payload.message); 
    
    this.name = 'AppBaseError';
    this.title = payload.title;
    this.status = payload.status;
    this.details = payload.details;
  }

  /**
   * Método estático mapeado con las propiedades en minúscula
   */
  static fromBackend(data: Partial<BackendErrorPayload>): AppBaseError {
    return new AppBaseError({
      title: data.title ?? 'Error Inesperado',
      message: data.message ?? 'Ha ocurrido un error en el servidor.',
      status: data.status ?? 500,
      details: data.details
    });
  }
}