import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, viewChild} from "@angular/core";
import WaveSurfer from 'wavesurfer.js'
import { GetLastSampleEditedUseCase } from "../../../application/use-cases/get-last-sample-edited.use-case";
import { AudioStateService } from "../../../state-manager/audio-state.service";
@Component({ 
  selector: 'app-wave-surfer',
  templateUrl: './wave-surfer.component.html',
  standalone: true,
  providers: [
    GetLastSampleEditedUseCase,
    AudioStateService,
  ]
})
export class WaveSurferComponent implements AfterViewInit, OnDestroy {

  waveformRef = viewChild<ElementRef<HTMLDivElement>>('waveform');

  private wave?: WaveSurfer;

  private getLastSampleEdited = inject(GetLastSampleEditedUseCase);
  private audioStateService = inject(AudioStateService);

  public audioSelected = this.audioStateService.audioSelected;

  constructor() {

    effect(() => {

      const audio = this.audioStateService.audioSelected();
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
        this.audioStateService.selectAudio(sample);
      },
      error: console.error,
    });

  }

  ngOnDestroy(): void {
    this.wave?.destroy();
  }

}
