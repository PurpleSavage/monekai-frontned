import {  Injectable, signal } from "@angular/core";
import { SampleEntity } from "../domain/entities/sample.entity";
import { SampleEffectsRequestDto } from "../application/dtos/requests/sample-effects-request.dto";
const DEFAULT_EFFECTS: SampleEffectsRequestDto = {
  reverb: 64,
  slowPitch: -12,
  saturation: 12,
  delay: 30,
  lowPass: 12500,
  highPass: 40,
  gain: -3,
  reverse: true,
};
@Injectable()
export class AudioEditStateService { 
  public audioSelectedToEdit = signal<SampleEntity | null>(null)
  public audioSelectedToEditIsPalying = signal<boolean>(false)
  public effects = signal<SampleEffectsRequestDto>({
    reverb:0,
    slowPitch: -12,
    saturation: 12,
    delay: 30,
    lowPass: 12500,
    highPass:40,
    gain: -3,
    reverse: true,
  })
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