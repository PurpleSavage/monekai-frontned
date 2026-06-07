export abstract class ListenerEventsPort {

  /**
   * Inicializa la conexión SSE
   */
   abstract connect(
     url: string ,
     options?: EventSourceInit
   ): void

  /**
   * Cierra la conexión SSE
   */
  abstract close(): void

  /**
   * Escucha un evento específico
   */
  abstract eventListener<T>(
    nameEvent: string,
    callback: (data: T) => void
  ): void

  /**
   * Escucha errores globales
   */
  abstract onError(
    callback: (error: Event) => void
  ): void

  /**
   * Estado actual de la conexión
   */
  abstract readyState(): number
}