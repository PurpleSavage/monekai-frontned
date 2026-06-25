import { Injectable, OnDestroy } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AudioEffectsEngineService implements OnDestroy{
  private audioContext = new AudioContext()
  
  private originalBuffer: AudioBuffer | null = null
  private originalUrlLoaded: string | null = null
  private reversedBlobUrl: string | null = null

  
  private convolver = this.audioContext.createConvolver()
  private dryGain = this.audioContext.createGain()
  private wetGain = this.audioContext.createGain()
  private gainNode = this.audioContext.createGain()
  private delayNode = this.audioContext.createDelay()
  private saturationNode = this.audioContext.createWaveShaper()
  private source?: MediaElementAudioSourceNode
  private lowPassFilter = this.audioContext.createBiquadFilter()
  private highPassFilter = this.audioContext.createBiquadFilter()
  
  
  constructor() {
    this.convolver.buffer = this.createImpulseResponse(3, 2)
    this.saturationNode.curve = this.createSaturationCurve(0)
    this.saturationNode.oversample = '4x'
    this.lowPassFilter.type = 'lowpass'
    this.highPassFilter.type = 'highpass'
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
  public setSlowPitch(semitones: number) {
    if (!this.source) return
      const mediaElement = this.source.mediaElement
      mediaElement.preservesPitch = false 
      const rate = Math.pow(2, semitones / 12)
      mediaElement.playbackRate = rate
  }
  public resetNodes() { 
    this.gainNode.disconnect()
    this.delayNode.disconnect()
    this.convolver.disconnect()
    this.dryGain.disconnect()
    this.wetGain.disconnect()
    this.saturationNode.disconnect()
    this.lowPassFilter.disconnect()
    this.highPassFilter.disconnect()
  }
  public setMediaElement(mediaElement: HTMLMediaElement) {
    if (this.source) {
      this.source.disconnect()
      this.source = undefined
    }
    this.resetNodes()
    this.source =this.audioContext.createMediaElementSource(mediaElement)
    this.source.connect(this.gainNode)
    this.gainNode.connect(this.saturationNode)
    this.saturationNode.connect(this.highPassFilter)
    this.highPassFilter.connect(this.lowPassFilter) 
    this.lowPassFilter.connect(this.delayNode)
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
  public setReverb(value: number) {
    const mix = value / 100
    this.wetGain.gain.value = mix
    this.dryGain.gain.value = 1
  }
  public setGain(db: number) { 
    const linear = Math.pow(10, db / 20)
    this.gainNode.gain.value = linear
  }
  public setDelay(value: number) {
    this.delayNode.delayTime.value = value/100
  }
  public setSaturation(value: number) {
    const amount = (value / 100) * 50 
    this.saturationNode.curve = this.createSaturationCurve(amount)
  }
 
  public setHighPass(frequency: number) {
    this.highPassFilter.frequency.value = frequency
  }
  public setLowPass(frequency: number) {
    this.lowPassFilter.frequency.value = frequency
  }

  
  private audioBufferToWavBlob(buffer: AudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate
    const length = buffer.length * numChannels * 2 + 44
    const arrayBuffer = new ArrayBuffer(length)
    const view = new DataView(arrayBuffer)
  
    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i))
      }
    }
  
    writeString(0, 'RIFF')
    view.setUint32(4, length - 8, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true) // PCM
    view.setUint16(22, numChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * numChannels * 2, true)
    view.setUint16(32, numChannels * 2, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, length - 44, true)
  
    const channels: Float32Array[] = []
    for (let i = 0; i < numChannels; i++) {
      channels.push(buffer.getChannelData(i))
    }
  
    let offset = 44
    for (let i = 0; i < buffer.length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        const sample = Math.max(-1, Math.min(1, channels[ch][i]))
        view.setInt16(offset, sample * 0x7fff, true)
        offset += 2
      }
    }
  
    return new Blob([arrayBuffer], { type: 'audio/wav' })
  } 
  private reverseBuffer(buffer: AudioBuffer): AudioBuffer {
    const reversed = this.audioContext.createBuffer(
      buffer.numberOfChannels,
      buffer.length,
      buffer.sampleRate
    )
    for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
      const original = buffer.getChannelData(ch)
      const reversedData = reversed.getChannelData(ch)
      reversedData.set(original)
      reversedData.reverse()
    }
    return reversed
  }
 

  private async ensureBuffer(url: string): Promise<void> { 
    if (
      this.originalBuffer &&
      this.originalUrlLoaded === url
    ) {
      return
    }
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    this.originalBuffer  = await this.audioContext.decodeAudioData(arrayBuffer)
    this.originalUrlLoaded = url
    this.revokeReversedUrl()
  }
  private revokeReversedUrl(): void {
    if (this.reversedBlobUrl) {
      URL.revokeObjectURL(this.reversedBlobUrl)
      this.reversedBlobUrl = null
    }
  }
  public async getAudioUrl(
    url: string,
    reverse: boolean
  ): Promise<string>{ 
    await this.ensureBuffer(url)
    if (!reverse) {
       return url
    }
    if (this.reversedBlobUrl) {
      return this.reversedBlobUrl
    }
    const reversedBuffer = this.reverseBuffer(this.originalBuffer!)
    const blob = this.audioBufferToWavBlob(reversedBuffer)
    this.reversedBlobUrl = URL.createObjectURL(blob)
    return this.reversedBlobUrl
  }
  ngOnDestroy(): void {
    this.revokeReversedUrl()
    this.audioContext.close()
  }
}