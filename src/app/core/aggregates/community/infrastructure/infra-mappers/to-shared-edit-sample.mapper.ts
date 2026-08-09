import { SharedEditSampleResponseDTO } from "../../application/dtos/responses/shared-edit-sample-response.dto";
import { SharedEditSampleEntity } from "../../domain/entities/shared-edit-sample.entity";
import { EffectsVO } from "../../domain/value-objects/effects.vo";

export function toSharedEditSampleEntity(data: SharedEditSampleResponseDTO): SharedEditSampleEntity {
  const effects: Partial<EffectsVO> = {
    reverb:data.sample.effects.reverb,
  	slowPitch:data.sample.effects.slowPitch,
  	saturation:data.sample.effects.saturation,
  	delay:data.sample.effects.delay,
  	lowPass:data.sample.effects.lowPass,
  	highPass:data.sample.effects.highPass,
  	gain:data.sample.effects.gain,
  	reverse:data.sample.effects.reverse,
  }
  return {
    id:data.id,
    likes:data.likes,
    downloads: data.downloads,
    createdAt:data.createdAt,
    sharedBy: {
      email: data.sharedBy.email,
      id:data.sharedBy.id
    },
    sample: {
      id:data.sample.id,
      effects,
      sampleName:data.sample.sampleName, 
      prompt:data.sample.prompt,
      finalAudioUrl:data.sample.finalAudioUrl
    }
  }
}