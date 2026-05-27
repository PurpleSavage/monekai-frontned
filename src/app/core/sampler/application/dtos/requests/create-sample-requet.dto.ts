import { ModelVersionType } from "../../../domain/value-objects/model-version.vo";
import { OutputFormatType } from "../../../domain/value-objects/output-format.vo";


export interface CreateSampleRequestDTO {
  prompt: string;
  modelVersion: ModelVersionType;
  duration: number;
  outputFormat: OutputFormatType;
  sampleName: string;
  email: string;
}
