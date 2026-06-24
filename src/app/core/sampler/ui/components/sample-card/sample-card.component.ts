import { Component, computed, DestroyRef, inject, Input, signal} from "@angular/core";
import { SampleEntity } from "../../../domain/entities/sample.entity";
import { LucidePause, LucidePlay, LucideSlidersHorizontal } from "@lucide/angular";
import { AudioStateService } from "../../../state-manager/audio-state.service";
import { AudioEditStateService } from "../../../state-manager/audio-edit-state.service";
import { CheckSampleChangesUseCase } from "../../../application/use-cases/check-sample-changes.use-case";
@Component({
  selector: 'app-sample-card',
  standalone: true,
  imports: [LucidePlay,LucidePause,LucideSlidersHorizontal],
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
  Esta función se encarga de seleccionar el audio para editar y verificar si hay cambios en el audio previo
  Si hay cambios, se abre un modal de advertencia para confirmar la edición
  */
  selectAudioToEdit() {
    this.audioEditStateService.setAudioToEditIsPlaying(false)
    this.audioEditStateService.setAudioToEdit(this.sample)
    
  }
}