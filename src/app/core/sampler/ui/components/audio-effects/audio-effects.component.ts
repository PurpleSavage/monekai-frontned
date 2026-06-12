import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AudioEditStateService } from "../../../state-manager/audio-edit-state.service";

@Component({
  selector: 'app-audio-effects',
  templateUrl: './audio-effects.component.html',
  standalone: true,
  imports:[FormsModule]
})
export class AudioEffectsPageComponent {
  protected audioEditState = inject(AudioEditStateService)
  protected reverbValue=computed(() => this.audioEditState.effects().reverb)
  protected slowPitchValue=computed(() => this.audioEditState.effects().slowPitch)
  protected saturationValue=computed(() => this.audioEditState.effects().saturation)
  protected delayValue=computed(() => this.audioEditState.effects().delay)
  protected lowPassValue=computed(() => this.audioEditState.effects().lowPass)
  protected highPassValue=computed(() => this.audioEditState.effects().highPass)
  protected gainValue=computed(() => this.audioEditState.effects().gain)
  protected reverseValue=computed(() => this.audioEditState.effects().reverse)

  setReverb(value: number) {
    this.audioEditState.setReverb(value)
  }
  
  setSlowPitch(value: number) {
    this.audioEditState.setSlowPitch(value)
  }
  
  setSaturation(value: number) {
    this.audioEditState.setSaturation(value)
  }
  
  setDelay(value: number) {
    this.audioEditState.setDelay(value)
  }
  
  setLowPass(value: number) {
    this.audioEditState.setLowPass(value)
  }
  
  setHighPass(value: number) {
    this.audioEditState.setHighPass(value)
  }
  
  setGain(value: number) {
    this.audioEditState.setGain(value)
  }
  
  toggleReverse(): void {
    const prevState= this.reverseValue()
    this.audioEditState.setReverse(!prevState)
  }
}