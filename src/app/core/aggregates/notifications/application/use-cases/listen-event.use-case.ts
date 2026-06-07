import { Injectable } from "@angular/core";
import { ListenerEventsPort } from "../ports/listener-events.port";

type EventCallback<T = any> = (data: T) => void

@Injectable()
export class ListenEventUseCase {

  private events = new Map<
    string,
    EventCallback<any>
  >()

  constructor(
    private listenerEventsService: ListenerEventsPort
  ) {
    
  }



  on<T>(nameEvent: string,callback: EventCallback<T>): void {

    this.events.set(
      nameEvent,
      callback
    )

    this.listenerEventsService.eventListener<T>(
      nameEvent,
      callback
    )
  }

  register(events: Record<string,EventCallback<any>>): void {

    for (const [eventName, callback] of Object.entries(events)) {
      this.on(
        eventName,
        callback
      )
    }
  }

  error(callback: (error: Event) => void): void {
    this.listenerEventsService.onError(callback)
  }

  readyState(): number {
    return this.listenerEventsService.readyState()
  }

  close(): void {
    this.listenerEventsService.close()
  }
}