

export interface SampleEditBaseInfoResponseDTO { 
  id: string
  effects: Partial<EffectsDTO>
  sampleName: string
  prompt: string
  finalAudioUrl:string
}
export interface EffectsDTO{ 
  reverb:number
	slowPitch:number
	saturation:number
	delay:number
	lowPass:number
	highPass:number
	gain:number
	reverse:boolean
}