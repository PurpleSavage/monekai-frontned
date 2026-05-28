import { Injectable } from "@angular/core";
import { SamplerPort } from "../../application/ports/sampler.port";
import { CreateSampleRequestDTO } from "../../application/dtos/requests/create-sample-requet.dto";
import { catchError, map, Observable} from "rxjs";
import { SampleGenerationHttpResponse } from "../../application/dtos/responses/sample-generation-http-response.dto";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { PaginatedSampleResponseDTO } from "../../application/dtos/responses/paginated-samples-response.dto";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { PaginatedResponseDTO } from "../../../shared/common/application/dtos/responses/paginated-response.dto";
import { SampleEntity } from "../../domain/entities/sample.entity";
import { AppBaseError } from "../../../shared/common/infrastructure/http-errors/app-base.error";
import { toSampleEntity } from "../infra-mappers/to-sample-entity.mapper";

@Injectable()
export class SamplerHttpService implements SamplerPort {
  constructor(private http: HttpClient) { }
  public generateSample(dto: CreateSampleRequestDTO):Observable<SampleGenerationHttpResponse> {
    return this.http.post<SampleGenerationHttpResponse>("/audio/create", dto);
  }
  public listSamples(dto: PaginatedRequestDTO): Observable<PaginatedResponseDTO<SampleEntity>> {
    let params = new HttpParams()
         .set('page', dto.page.toString())
         .set('limit', dto.limit.toString());
    return this.http.get<PaginatedSampleResponseDTO>("/audio/samples", { params }).pipe(
      map((data) => {
        const samples = data.items.map((item) => toSampleEntity(item))
        const hasMore =(data.page * data.pageSize) < data.total;
        return {
          items: samples,
          total: data.total,
          page: data.page,
          pageSize: data.pageSize,
          hasMore
        }
      }),
      catchError((err: unknown) => { 
        let appError: AppBaseError
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          })
        }
        throw appError
      })
      
    )
  }
}