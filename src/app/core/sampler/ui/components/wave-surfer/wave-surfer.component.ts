import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, viewChild} from "@angular/core";
import WaveSurfer from 'wavesurfer.js'
import { GetLastSampleEditedUseCase } from "../../../application/use-cases/get-last-sample-edited.use-case";
import { AudioEditStateService } from "../../../state-manager/audio-edit-state.service";
@Component({ 
  selector: 'app-wave-surfer',
  templateUrl: './wave-surfer.component.html',
  standalone: true,
  providers: [
    GetLastSampleEditedUseCase,
  ]
})
export class WaveSurferComponent implements AfterViewInit, OnDestroy {

  waveformRef = viewChild<ElementRef<HTMLDivElement>>('waveform');

  private wave?: WaveSurfer;

  private getLastSampleEdited = inject(GetLastSampleEditedUseCase);
  private audioEditStateService= inject(AudioEditStateService)
  public audioSelected = this.audioEditStateService.audioSelectedToEdit;
  
  constructor() {
    this.effectAudioPlaying()
    this.effectAudioSelectToEdit()

  }
  private effectAudioPlaying() { 
    effect(() => { 
      const isPlaying = this.audioEditStateService.audioSelectedToEditIsPalying();
      if (isPlaying) {
        this.wave?.play();
      } else {
        this.wave?.pause();
      }
    })
  }
  private effectAudioSelectToEdit() { 
    effect(() => {

      const audio = this.audioEditStateService.audioSelectedToEdit();
      const waveform = this.waveformRef();

      if (!audio?.audioUrl || !waveform) {
        this.wave?.destroy();
        return;
      }

      this.wave?.destroy();

      this.wave = WaveSurfer.create({
        container: waveform.nativeElement,
        waveColor: '#E8E8E8',
        progressColor: '#9F05FF',
        url: audio.audioUrl,
      });

    });
  }
  
  ngAfterViewInit(): void {

    this.getLastSampleEdited.execute().subscribe({
      next: sample => {
        this.audioEditStateService.setAudioToEdit(sample);
      },
      error: console.error,
    });

  }
  ngOnDestroy(): void {
    if (this.wave) { 
      this.wave.destroy();
    }
  }

}
