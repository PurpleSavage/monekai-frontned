import { Injectable } from "@angular/core";
import { ListenerEventsPort } from "../../application/ports/listener-events.port";
import { environment } from "../../../../../../environments/environment.development";

Injectable()
export class EventSourceService implements ListenerEventsPort {

  private eventSource: EventSource | null = null

  constructor() {
    this.connect()
  }

  connect(
    url: string = environment.backendUrl,
    options?: EventSourceInit
  ): void {

    // evita múltiples conexiones
    if (this.eventSource) {
      this.close()
    }

    this.eventSource = new EventSource(url, options)
  }

  close(): void {

    if (!this.eventSource) {
      console.error(
        'The event source no longer exists in the application context.'
      )
      return
    }

    this.eventSource.close()
    this.eventSource = null
  }

  readyState(): number {

    if (!this.eventSource) {
      return EventSource.CLOSED
    }

    return this.eventSource.readyState
  }

  eventListener<T>(
    nameEvent: string,
    callback: (data: T) => void
  ): void {

    if (!this.eventSource) {
      console.error('EventSource is not initialized.')
      return
    }

    this.eventSource.addEventListener(
      nameEvent,
      (event: MessageEvent) => {

        try {

          const parsedData = JSON.parse(event.data) as T
          callback(parsedData)

        } catch {

          // fallback por si el backend manda texto plano
          callback(event.data as T)
        }
      }
    )
  }

  onMessage<T>(
    callback: (data: T) => void
  ): void {

    if (!this.eventSource) {
      console.error('EventSource is not initialized.')
      return
    }

    this.eventSource.onmessage = (event: MessageEvent) => {

      try {

        const parsedData = JSON.parse(event.data) as T
        callback(parsedData)

      } catch {

        callback(event.data as T)
      }
    }
  }

  onOpen(callback: () => void): void {

    if (!this.eventSource) {
      console.error('EventSource is not initialized.')
      return
    }

    this.eventSource.onopen = () => {
      callback()
    }
  }

  onError(
    callback: (error: Event) => void
  ): void {

    if (!this.eventSource) {
      console.error('EventSource is not initialized.')
      return
    }

    this.eventSource.onerror = (error: Event) => {
      callback(error)
    }
  }

  removeEventListener(
    nameEvent: string,
    callback: EventListenerOrEventListenerObject
  ): void {

    if (!this.eventSource) {
      console.error('EventSource is not initialized.')
      return
    }

    this.eventSource.removeEventListener(
      nameEvent,
      callback
    )
  }
}