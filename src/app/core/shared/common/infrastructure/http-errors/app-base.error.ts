export interface BackendErrorPayload {
  Title: string;
  Message: string;
  Status: number;
  Details?: Record<string, string>;
}
export class AppBaseError extends Error {
  public readonly title: string;
  public readonly status: number;
  public readonly details?: Record<string, string>;

  constructor(payload: BackendErrorPayload) {
    // Pasamos el Message al constructor base de 'Error'
    super(payload.Message); 
    
    this.name = 'AppBaseError';
    this.title = payload.Title;
    this.status = payload.Status;
    this.details = payload.Details;
  }

  /**
   * Método estático para instanciar el error fácilmente 
   * a partir de la respuesta cruda del backend (JSON)
   */
  static fromBackend(data: Partial<BackendErrorPayload>): AppBaseError {
    return new AppBaseError({
      Title: data.Title ?? 'Error Inesperado',
      Message: data.Message ?? 'Ha ocurrido un error en el servidor.',
      Status: data.Status ?? 500,
      Details: data.Details
    });
  }
}