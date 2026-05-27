import { Injectable } from "@angular/core";
import { SamplerPort } from "../../application/ports/sampler.port";
import { CreateSampleRequestDTO } from "../../application/dtos/requests/create-sample-requet.dto";
import { Observable, tap } from "rxjs";
import { SampleGenerationHttpResponse } from "../../application/dtos/responses/sample-generation-http-response.dto";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SamplerHttpService implements SamplerPort {
  constructor(private http: HttpClient) { }
  public generateSample(dto: CreateSampleRequestDTO):Observable<SampleGenerationHttpResponse> {
    return this.http.post<SampleGenerationHttpResponse>("/audio/create", dto);
  }
}