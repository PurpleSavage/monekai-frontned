import { Component, computed, inject, Input} from "@angular/core";
import { SampleEntity } from "../../../domain/entities/sample.entity";
import { LucidePause, LucidePlay, LucideSlidersHorizontal } from "@lucide/angular";
import { AudioStateService } from "../../../state-manager/audio-state.service";
import { AudioEditStateService } from "../../../state-manager/audio-edit-state.service";

@Component({
  selector: 'app-sample-card',
  standalone: true,
  imports: [LucidePlay,LucidePause,LucideSlidersHorizontal],
  templateUrl: './sample-card.component.html',
  providers: []
})
export class SampleCardComponent {
  @Input({ required: true })
  sample!: SampleEntity;
  
  private audioStateService = inject(AudioStateService);
  private audioEditStateService = inject(AudioEditStateService);
  
  public isPlaying = computed(() => {
    const selected =
      this.audioStateService.audioSelectedToListen();

    return (
      selected?.audio?.id === this.sample.id &&
      selected.isPlaying
    );
  });

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
  
    selectAudioToEdit() {
      console.log('este es el sample que se va a editar', this.sample)
      this.audioEditStateService.setAudioToEditIsPlaying(false)
      this.audioEditStateService.setAudioToEdit(
        this.sample
      );
    }

}