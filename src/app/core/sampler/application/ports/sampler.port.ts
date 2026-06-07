import { Observable } from "rxjs";
import { SampleGenerationHttpResponse } from "../dtos/responses/sample-generation-http-response.dto";
import { CreateSampleRequestDTO } from "../dtos/requests/create-sample-requet.dto";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { PaginatedResponseDTO } from "../../../shared/common/application/dtos/responses/paginated-response.dto";
import { SampleEntity } from "../../domain/entities/sample.entity";

export abstract class SamplerPort {
  abstract generateSample(dto: CreateSampleRequestDTO): Observable<SampleGenerationHttpResponse>;
  abstract listSamples(dto: PaginatedRequestDTO): Observable<PaginatedResponseDTO<SampleEntity>>

}