
import { DatePipe } from "@angular/common";
import { SampleRepsonseDTO } from "../../application/dtos/responses/sample-response.dto";
import { SampleEntity } from "../../domain/entities/sample.entity";

export function toSampleEntity(data: SampleRepsonseDTO): SampleEntity {
  const datePipe = new DatePipe('en-US');
  const dateFormatted = datePipe.transform(data.createdAt, 'yyyy-MM-dd');
  return {
    id: data.id,
    sampleName: data.sampleName,
    prompt: data.prompt,
    audioUrl: data.audioUrl,
    duration: data.duration,
    outputFormat: data.outputFormat,
    modelVersion: data.modelVersion,
    status: data.status,
    createdAt: dateFormatted || 'no created at',
  }
}

