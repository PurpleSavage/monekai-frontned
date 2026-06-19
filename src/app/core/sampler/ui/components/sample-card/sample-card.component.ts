import { Component, computed, inject, Input, signal} from "@angular/core";
import { SampleEntity } from "../../../domain/entities/sample.entity";
import { LucidePause, LucidePlay, LucideSlidersHorizontal } from "@lucide/angular";
import { AudioStateService } from "../../../state-manager/audio-state.service";
import { AudioEditStateService } from "../../../state-manager/audio-edit-state.service";
import { ModalAction, WarningModalComponent } from "../../../../shared/common/ui/components/warning-modal/warning-modal.component";
import { SaveSampleUseCase } from "../../../application/use-cases/save-sample.use-case";

@Component({
  selector: 'app-sample-card',
  standalone: true,
  imports: [LucidePlay,LucidePause,LucideSlidersHorizontal, WarningModalComponent],
  templateUrl: './sample-card.component.html',
  providers: [],
})
export class SampleCardComponent {
  @Input({ required: true })
  sample!: SampleEntity;
  
  private audioStateService = inject(AudioStateService)
  private audioEditStateService = inject(AudioEditStateService)
  private saveSampleUseCase = inject(SaveSampleUseCase)
  
  protected openModalWarning = signal<boolean>(false)
  
  public isPlaying = computed(() => {
    const selected =
      this.audioStateService.audioSelectedToListen()

    return (
      selected?.audio?.id === this.sample.id &&
      selected.isPlaying
    );
  });


  openWarningModal() {
    this.openModalWarning.set(true)
  }

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
  acceptEdit(action: ModalAction) { 
      if(action==='CLOSE-DO') {
        console.log('save and continue', this.sample)
      }
      this.audioEditStateService.resetEffects()
      this.audioEditStateService.setAudioToEdit(this.sample)
      this.openModalWarning.set(false)
    }
    selectAudioToEdit() {
      console.log('este es el sample que se va a editar', this.sample)
      this.audioEditStateService.setAudioToEditIsPlaying(false)
      this.openWarningModal()
      
    }

}