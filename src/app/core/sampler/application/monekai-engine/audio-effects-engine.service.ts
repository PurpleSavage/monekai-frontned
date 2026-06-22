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
  private saturationNode = this.audioContext.createWaveShaper()
  private source?: MediaElementAudioSourceNode

  constructor() {
    this.convolver.buffer = this.createImpulseResponse(3, 2)
    this.saturationNode.curve = this.createSaturationCurve(0)
    this.saturationNode.oversample = '4x'
  }
  private createImpulseResponse(
    duration: number,
    decay: number
  ): AudioBuffer {
  
    const sampleRate = this.audioContext.sampleRate
  
    const length = sampleRate * duration
  
    const impulse = this.audioContext.createBuffer(
      2,
      length,
      sampleRate
    )
  
    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
  
        data[i] =
          (Math.random() * 2 - 1) *
          Math.pow(1 - i / length, decay)
      }
    }
  
    return impulse;
  }
  private createSaturationCurve(amount: number): Float32Array<ArrayBuffer> {
    const samples = 44100
    const buffer = new ArrayBuffer(samples * Float32Array.BYTES_PER_ELEMENT)
    const curve = new Float32Array(buffer)
    const k = amount
  
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1
      if (k === 0) {
        curve[i] = x
      } else {
        curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x))
      }
    }
    return curve
  }
  async resume() {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }
  resetNodes() { 
    this.gainNode.disconnect()
    this.delayNode.disconnect()
    this.convolver.disconnect()
    this.dryGain.disconnect()
    this.wetGain.disconnect()
    this.saturationNode.disconnect()
  }
  setMediaElement(mediaElement: HTMLMediaElement) {
    if (this.source) {
      this.source.disconnect()
      this.source = undefined
    }
    this.resetNodes()
    this.source =this.audioContext.createMediaElementSource(mediaElement)
    this.source.connect(this.gainNode)
    this.gainNode.connect(this.saturationNode)
    this.saturationNode.connect(this.delayNode)
    this.delayNode.connect(this.dryGain)
    this.delayNode.connect(this.convolver)
    this.convolver.connect(this.wetGain)
    this.dryGain.connect(
      this.audioContext.destination
    )
    this.wetGain.connect(
      this.audioContext.destination
    )
  }
  setReverb(value: number) {
    const mix = value / 100
    this.wetGain.gain.value = mix
    this.dryGain.gain.value = 1
  }
  setGain(db: number) { 
    const linear = Math.pow(10, db / 20)
    this.gainNode.gain.value = linear
  }
  setDelay(value: number) {
    this.delayNode.delayTime.value = value/100
  }
  setSaturation(value: number) {
    const amount = (value / 100) * 50 
    this.saturationNode.curve = this.createSaturationCurve(amount)
  }
  
}