import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AudioEffectsEngineService {
  private audioContext = new AudioContext();
  private convolver = this.audioContext.createConvolver()
  private dryGain = this.audioContext.createGain()
  private wetGain = this.audioContext.createGain()
  private gainNode = this.audioContext.createGain()
  private delayNode = this.audioContext.createDelay()
  private source?: MediaElementAudioSourceNode

  constructor() {}

  async resume() {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  setMediaElement(mediaElement: HTMLMediaElement) {

    if (this.source) {
      return;
    }

    this.source =this.audioContext.createMediaElementSource(mediaElement)
    this.source.connect(this.dryGain)
    this.source.connect(this.convolver)
    this.convolver.connect(this.wetGain)
    this.dryGain.connect(this.audioContext.destination)
    this.wetGain.connect(this.audioContext.destination)
  }
  setReverb(value: number) {
    const mix = value / 100
    this.wetGain.gain.value = mix
    this.dryGain.gain.value = 1 - mix
  }
  setGain(db: number) { 
    const linear = Math.pow(10, db / 20)
    this.gainNode.gain.value = linear
  }
  setDelay(value: number) {
    this.delayNode.delayTime.value = value
    this.delayNode.connect(this.wetGain)
  }
  
}