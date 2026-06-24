import { Component, computed, DestroyRef, inject, Input, signal} from "@angular/core";
import { SampleEntity } from "../../../domain/entities/sample.entity";
import { LucidePause, LucidePlay, LucideSlidersHorizontal } from "@lucide/angular";
import { AudioStateService } from "../../../state-manager/audio-state.service";
import { AudioEditStateService } from "../../../state-manager/audio-edit-state.service";
import { ModalAction, ModalActionType, WarningModalComponent } from "../../../../shared/common/ui/components/warning-modal/warning-modal.component";
import { SaveSampleUseCase } from "../../../application/use-cases/save-sample.use-case";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CheckSampleChangesUseCase } from "../../../application/use-cases/check-sample-changes.use-case";
import { toast } from 'ngx-sonner'
import { LocalPersistenceError } from "../../../../shared/common/infrastructure/persisitence-error/local-persistence.error";
@Component({
  selector: 'app-sample-card',
  standalone: true,
  imports: [LucidePlay,LucidePause,LucideSlidersHorizontal, WarningModalComponent],
  templateUrl: './sample-card.component.html',
  providers: [
    CheckSampleChangesUseCase
  ],
})
export class SampleCardComponent {
  @Input({ required: true })
  sample!: SampleEntity;
  
  private audioStateService = inject(AudioStateService)
  private audioEditStateService = inject(AudioEditStateService)
  private saveSampleUseCase = inject(SaveSampleUseCase)
  private destroyRef = inject(DestroyRef)
  private checkSampleChangesUseCase = inject(CheckSampleChangesUseCase)
  protected openModalWarning = signal<boolean>(false)
  
  public isPlaying = computed(() => {
    const selected =
      this.audioStateService.audioSelectedToListen()

    return (
      selected?.audio?.id === this.sample.id &&
      selected.isPlaying
    )
  })


  openWarningModal() {
    this.openModalWarning.set(true)
  }
  /*
    esta función se encarga de cambiar el estado de reproducción del audio seleccionado para editar
  */
  togglePlay() {
    const current =
      this.audioStateService.audioSelectedToListen();

    if (current?.audio?.id === this.sample.id) {
      this.audioStateService.selectAudioToListen({
        audio: current.audio,
          isPlaying: !current.isPlaying,
        });
  
        return;
      }
  
      this.audioStateService.selectAudioToListen({
        audio: this.sample,
        isPlaying: true,
      });
  }
  /*
    esta función sirve para escuchar el evento disparado por el modal, posee dos acciones una que solo 
    continua sin guardar cabios y otra que continua pero guarda los cambios en indexed db
  */
  acceptEdit(action: ModalActionType) { 
    if (action === ModalAction.CLOSE_DO) {
      const prevSampleEdited = this.audioEditStateService.getSampleEdited()
      if (!prevSampleEdited) {
        this.openModalWarning.set(false)
        return
      }
      this.saveSampleUseCase.execute(prevSampleEdited)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          error: (error) => {
            console.error(error) 
          },
        })
    }
    this.audioEditStateService.resetEffects()
    this.audioEditStateService.setAudioToEdit(this.sample)
    this.openModalWarning.set(false)
  }

  /*
  Esta función se encarga de seleccionar el audio para editar y verificar si hay cambios en el audio previo
  Si hay cambios, se abre un modal de advertencia para confirmar la edición
  */
  selectAudioToEdit() {
    this.audioEditStateService.setAudioToEditIsPlaying(false)
    const prevSample = this.audioEditStateService.getSampleEdited()
    if (!prevSample) {
       this.openModalWarning.set(false)
      this.audioEditStateService.setAudioToEdit(this.sample)
      return 
    }
    this.checkSampleChangesUseCase.execute(prevSample)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          if (result && result.isChange) {
            this.openWarningModal()
          } else {
            this.audioEditStateService.setAudioToEdit(this.sample)
            this.openModalWarning.set(false)
          }
        },
        error: (error) => {
          if (error instanceof LocalPersistenceError) { 
            toast.error('An error has occurred', {
              description: error.message
            })
          }
          console.error(error)
        },
      })
  }
}