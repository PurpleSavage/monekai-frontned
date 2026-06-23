import {  Injectable, signal } from "@angular/core";
import { SampleEntity } from "../domain/entities/sample.entity";
import { SampleEffectsRequestDto } from "../application/dtos/requests/sample-effects-request.dto";
const DEFAULT_EFFECTS: SampleEffectsRequestDto = {
  reverb: 0,        // sin reverb
  slowPitch: 0,      // cambiar de -12 a 0
  saturation: 0,     // sin distorsión
  delay: 0,           // cambiar de 30 a 0
  lowPass: 20000,     // cambiar de 12500 a 20000
  highPass: 20,        // cambiar de 40 a 0
  gain: 0,            // cambiar de -3 a 0
  reverse: false,     // audio normal
}
@Injectable()
export class AudioEditStateService { 
  public audioSelectedToEdit = signal<SampleEntity | null>(null)
  public audioSelectedToEditIsPalying = signal<boolean>(false)
  public effects = signal<SampleEffectsRequestDto>({...DEFAULT_EFFECTS })
  public setAudioToEditIsPlaying(isPlaying: boolean) {
    this.audioSelectedToEditIsPalying.set(isPlaying)
  }
  public setReverb(value: number) {
    this.effects.update(effects => ({ ...effects, reverb: value }))
  }
  public setSlowPitch(value: number) {
    this.effects.update(effects => ({ ...effects, slowPitch: value }))
  }
  public setSaturation(value: number) {
    this.effects.update(effects => ({ ...effects, saturation: value }))
  }
  public setDelay(value: number) {
    this.effects.update(effects => ({ ...effects, delay: value }))
  }
  public setLowPass(value: number) {
    this.effects.update(effects => ({ ...effects, lowPass: value }))
  }
  public setHighPass(value: number) {
    this.effects.update(effects => ({ ...effects, highPass: value }))
  }
  public setGain(value: number) {
    this.effects.update(effects => ({ ...effects, gain: value }))
  }
  public setReverse(value: boolean) {
    this.effects.update(effects => ({ ...effects, reverse: value }))
  }
  
  public setAudioToEdit(audio:SampleEntity | null) { 
    this.audioSelectedToEdit.set(audio)
  }

  public resetEffects() {
    this.effects.set({
      ...DEFAULT_EFFECTS
    });
  }
}