import { SampleBaseInfoResponseDto } from "../../application/dtos/responses/sample-base-info-response.dto";
import { SampleBaseInfo } from "../../domain/entities/sample-base-info.entity";

export function toSampleInfoEntity(dto:SampleBaseInfoResponseDto):SampleBaseInfo { 
  return {
    id: dto.id,
    sampleName:dto.sampleName,
    intialAudioUrl: dto.intialAudioUrl,
    prompt: dto.prompt,
    duration:dto.duration
  }
}