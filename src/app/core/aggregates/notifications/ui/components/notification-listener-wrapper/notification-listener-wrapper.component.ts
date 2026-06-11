import { Component, computed, inject, OnDestroy, OnInit } from "@angular/core";
import { ListenEventUseCase } from "../../../application/use-cases/listen-event.use-case";
import { ListenerEventsPort } from "../../../application/ports/listener-events.port";
import { EventSourceService } from "../../../infrastructure/sse/event-source.service";
import { AudioStateService } from "../../../../../sampler/state-manager/audio-state.service";
import { SampleEntity } from "../../../../../sampler/domain/entities/sample.entity";


@Component({
  selector: 'app-notification-listener-wrapper',
  templateUrl: './notification-listener-wrapper.component.html',
  standalone: true,
  providers: [
    ListenEventUseCase,
    { provide:ListenerEventsPort , useClass:EventSourceService }
  ]
})
export class NotificationListenerWrapperComponent implements OnInit, OnDestroy {

  private listenEventsUseCase =inject(ListenEventUseCase)

  private audioStateService = inject(AudioStateService)

  protected sizeNotifications = computed(()=>this.audioStateService.audiosGenerated().data.length)

  ngOnInit(): void {
    this.initEventListening() 
    this.listenConnectionErrors()
  }

  ngOnDestroy(): void {
    this.listenEventsUseCase.close()
  }

  /**
   * Registro centralizado de eventos
   */
   private initEventListening(): void {
   
     this.listenEventsUseCase.register({
       'sample_ready': (
         audio: SampleEntity
       ) => {
         console.log('sample_ready', audio)
         this.audioStateService.addAudio(audio)
       },
       'sample_error': (
         error: {
           error:string
         }
       ) => {
   
         console.error(error)
       }
     })
   }

  /**
   * Error global de EventSource
   */
  private listenConnectionErrors(): void {
    this.listenEventsUseCase.error((error) => {
      console.error(
        'SSE connection error:',
        error
      )

      console.log(
        'ReadyState:',
        this.listenEventsUseCase.readyState()
      )
    })
  }
}
