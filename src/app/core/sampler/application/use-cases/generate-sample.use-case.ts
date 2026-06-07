import { Injectable } from "@angular/core";
import { SamplerPort } from "../ports/sampler.port";
import { CreateSampleRequestDTO } from "../dtos/requests/create-sample-requet.dto";
import { Observable, take } from "rxjs";
import { SampleGenerationHttpResponse } from "../dtos/responses/sample-generation-http-response.dto";


@Injectable()
export class GenerateSampleUseCase {
  constructor(
    private samplerHttpService: SamplerPort
  ) { }
  execute(requestPayload: CreateSampleRequestDTO):Observable<SampleGenerationHttpResponse> { 
    return this.samplerHttpService.generateSample(requestPayload).pipe(
      take(1)
    )
  }
}