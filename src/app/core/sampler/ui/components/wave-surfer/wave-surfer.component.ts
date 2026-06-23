import { AfterViewInit, Component, computed, effect, ElementRef, inject, OnDestroy, signal, viewChild} from "@angular/core";
import WaveSurfer from 'wavesurfer.js'
import { GetLastSampleEditedUseCase } from "../../../application/use-cases/get-last-sample-edited.use-case";
import { AudioEditStateService } from "../../../state-manager/audio-edit-state.service";
import { AudioEffectsEngineService } from "../../../application/monekai-engine/audio-effects-engine.service";
@Component({ 
  selector: 'app-wave-surfer',
  templateUrl: './wave-surfer.component.html',
  standalone: true,
  providers: [
    GetLastSampleEditedUseCase,
  ]
})
export class WaveSurferComponent implements AfterViewInit, OnDestroy {
  waveformRef = viewChild<ElementRef<HTMLDivElement>>('waveform')
  private wave?: WaveSurfer;
  private getLastSampleEdited = inject(GetLastSampleEditedUseCase)
  private audioEditStateService = inject(AudioEditStateService)
  private audioEffectsEngine = inject(AudioEffectsEngineService)
  
  public audioSelected = this.audioEditStateService.audioSelectedToEdit
  
  protected reverbBackground = computed(() => {
    if (!this.audioSelected()?.audioUrl) return 'transparent'
    const fx = this.audioEditStateService.effects()
    const reverb = fx.reverb; // 0 a 100
    if (reverb === 0) return 'transparent'
    // RGB de pink-500
    const pinkRGB = '236, 72, 153' 
    const factor = reverb / 100;
    const centerOpacity = factor * 0.15
    const edgeOpacity = factor * 0.65  
    return `radial-gradient(circle, rgba(${pinkRGB}, ${centerOpacity}) 0%, rgba(${pinkRGB}, ${edgeOpacity}) 100%)`
  })
  constructor() {
    this.effectAudioPlaying()
    this.effectAudioSelectToEdit()
    this.effectAdioEffects()
  }
  private effectAdioEffects() { 
    effect(() => { 
      const fx = this.audioEditStateService.effects()
      this.audioEffectsEngine.setReverb(fx.reverb)
      this.audioEffectsEngine.setGain(fx.gain)
      this.audioEffectsEngine.setDelay(fx.delay)
      this.audioEffectsEngine.setSaturation(fx.saturation)
      this.audioEffectsEngine.setSlowPitch(fx.slowPitch)
      //TODO:  reverse
      this.audioEffectsEngine.setHighPass(fx.highPass)
      this.audioEffectsEngine.setLowPass(fx.lowPass)
    })
  }
  private effectAudioPlaying() { 
    effect(() => { 
      const isPlaying = this.audioEditStateService.audioSelectedToEditIsPalying()
      if (isPlaying) {
        this.wave?.play()
      } else {
        this.wave?.pause()
      }
    })
  }
  private effectAudioSelectToEdit() { 
    effect(() => {
      const audio = this.audioEditStateService.audioSelectedToEdit();
      const waveform = this.waveformRef()
      if (!audio?.audioUrl || !waveform) {
        this.wave?.destroy()
        return
      }
      this.wave?.destroy();
      this.wave = WaveSurfer.create({
        container: waveform.nativeElement,
        waveColor: '#E8E8E8',
        progressColor: '#9F05FF',
        url: audio.audioUrl,
      })
      const mediaElement = this.wave?.getMediaElement()
      if (mediaElement) {
        this.audioEffectsEngine.setMediaElement(mediaElement)
      }
    })
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
      this.wave.destroy()
    }
  }

}
