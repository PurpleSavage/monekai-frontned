import { Injectable } from "@angular/core";
import { SamplerPort } from "../ports/sampler.port";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import {  Observable, take } from "rxjs";
import { SampleEntity } from "../../domain/entities/sample.entity";
import { PaginatedResponseDTO } from "../../../shared/common/application/dtos/responses/paginated-response.dto";

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