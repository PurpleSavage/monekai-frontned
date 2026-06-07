import { StatusSampleLoadingType } from "../../../domain/value-objects/status-sample-loading.vo";

export interface SampleGenerationHttpResponse { 
  generationId: string;
  status: StatusSampleLoadingType;
  userId: string;
}