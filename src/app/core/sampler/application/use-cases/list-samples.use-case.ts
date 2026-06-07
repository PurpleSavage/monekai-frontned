import { Injectable } from "@angular/core";
import { SamplerPort } from "../ports/sampler.port";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { from, map, Observable, of, switchMap, take } from "rxjs";
import { SampleEntity } from "../../domain/entities/sample.entity";
import { PaginatedSampleResponseDTO } from "../dtos/responses/paginated-samples-response.dto";
import { MetadataPersistencePort } from "../../../shared/common/application/ports/metadata-persistence.port";
import { PaginatedResponseDTO } from "../../../shared/common/application/dtos/responses/paginated-response.dto";
import { MetadataPagedVO } from "../../../shared/common/domain/value-objects/metadata-paged.vo";
import { SamplerPersistencePort } from "../ports/sampler-persistence.port";

@Injectable()
export class ListSamplesUseCase {
  constructor(
    private samplerHttpService: SamplerPort
  ) { }

  public execute(dto: PaginatedRequestDTO): Observable<PaginatedResponseDTO<SampleEntity>> { 
    return this.samplerHttpService.listSamples(dto).pipe(
      take(1) 
    );
  }
}