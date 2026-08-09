import { EffectsVO } from "../value-objects/effects.vo"

export interface SampleEditBaseInfoEntity { 
  id: string
  effects: Partial<EffectsVO>
  sampleName: string
  prompt: string
  finalAudioUrl:string
}

