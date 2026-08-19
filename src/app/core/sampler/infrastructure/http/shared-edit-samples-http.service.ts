import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { SharedEditSamplesPort } from "../../application/ports/shared-edit-samples.port";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { PaginatedResponseDTO } from "../../../shared/common/application/dtos/responses/paginated-response.dto";
import { SharedEditSampleResponseDTO } from "../../../aggregates/community/application/dtos/responses/shared-edit-sample-response.dto";
import { PaginatedSharedEditSamplesResponseDTO } from "../../../aggregates/community/application/dtos/responses/paginated-shared-edit-sample.dto";
import { toSharedEditSampleEntity } from "../../../aggregates/community/infrastructure/infra-mappers/to-shared-edit-sample.mapper";
import { AppBaseError } from "../../../shared/common/infrastructure/http-errors/app-base.error";

@Injectable()
export class SharedEditSamplesHttpService implements SharedEditSamplesPort {
  constructor(private http: HttpClient) { }

  listSharedEditSamples(dto: PaginatedRequestDTO): Observable<PaginatedSharedEditSamplesResponseDTO> {
    let params = new HttpParams()
      .set('page', dto.page.toString())
      .set('limit', dto.limit.toString())
    return this.http.get<PaginatedResponseDTO<SharedEditSampleResponseDTO>>('/community/edit-samples', { params }).pipe(
      map((data) => {
        const editSamples = data.data.map((sample) => toSharedEditSampleEntity(sample))
        const hasMore = (data.page * data.pageSize) < data.total;
        return {
          data: editSamples,
          total: data.total,
          page: data.page,
          pageSize: data.pageSize,
          hasMore
        }
      }),
      catchError((err: unknown) => {
        let appError: AppBaseError;
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          })
        }
        return throwError(() => appError)
      })
    )
  }
}
