import { Observable } from "rxjs";
import { SampleGenerationHttpResponse } from "../dtos/responses/sample-generation-http-response.dto";
import { CreateSampleRequestDTO } from "../dtos/requests/create-sample-requet.dto";

export abstract class SamplerPort {
  abstract generateSample(dto:CreateSampleRequestDTO):Observable<SampleGenerationHttpResponse>;
}