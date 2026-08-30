import { Injectable } from "@angular/core";
import { CommunityPort } from "../../application/ports/community.port";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { PaginatedRequestDTO } from "../../../../shared/common/application/dtos/requests/paginated-request.dto";
import { LikeSharedSampleResponseDto } from "../../application/dtos/responses/like-shared-sample-response.dto";
import { DownloadSampleResponseDto } from "../../application/dtos/responses/download-response.dto";
import { SharedSampleResponseDto } from "../../application/dtos/responses/shared-sample-response.dto";
import { AppBaseError } from "../../../../shared/common/infrastructure/http-errors/app-base.error";
import { PaginatedResponseDTO } from "../../../../shared/common/application/dtos/responses/paginated-response.dto";
import { PaginatedSharedSamplesResponseDTO } from "../../application/dtos/responses/paginated-shared-samples.dto";
import { toSharedSampleEntity } from "../infra-mappers/to-shared-sample-entity.mapper";
import { PaginatedSharedEditSamplesResponseDTO } from "../../application/dtos/responses/paginated-shared-edit-sample.dto";
import { SharedEditSampleResponseDTO } from "../../application/dtos/responses/shared-edit-sample-response.dto";
import { toSharedEditSampleEntity } from "../infra-mappers/to-shared-edit-sample.mapper";
import { LatestRequestDTO } from "../../application/dtos/requests/latest-request.dto";

@Injectable()
export class CommunityHttpService implements CommunityPort { 
  constructor(private http: HttpClient) { }
  listSharedSamples(dto: PaginatedRequestDTO): Observable<PaginatedSharedSamplesResponseDTO> {
    let params = new HttpParams()
      .set('page', dto.page.toString())
      .set('limit', dto.limit.toString())
    return this.http.get<PaginatedResponseDTO<SharedSampleResponseDto>>("/community/samples", { params }).pipe(
      map((data) => { 
        const sharedSamples = data.data.map((sample)=>toSharedSampleEntity(sample))
         const hasMore = (data.page * data.pageSize) < data.total;
        return {
          data: sharedSamples,
          total: data.total,
          page: data.page,
          pageSize: data.pageSize,
          hasMore
        }
      }),
      catchError((err:unknown) => { 
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
        return throwError(() => appError)
      })
    )
  }
  listSharedEditSamples(dto:PaginatedRequestDTO): Observable<PaginatedSharedEditSamplesResponseDTO> {
    let params = new HttpParams()
      .set('page', dto.page.toString())
      .set('limit', dto.limit.toString())
    return this.http.get<PaginatedResponseDTO<SharedEditSampleResponseDTO>>('/community/edit-samples', { params }).pipe(
      map((data) => { 
        const editSamples =data.data.map((sample)=>toSharedEditSampleEntity(sample)) 
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
          });
        }
        return throwError(() => appError)
      })
    )
  }

  listLatestSharedSamples(dto: LatestRequestDTO): Observable<PaginatedSharedSamplesResponseDTO> {
    let params = new HttpParams()
      .set('limit', dto.limit.toString())
    return this.http.get<PaginatedResponseDTO<SharedSampleResponseDto>>('/community/latest-samples', { params }).pipe(
      map((data) => {
        const sharedSamples = data.data.map((sample) => toSharedSampleEntity(sample))
        const hasMore = (data.page * data.pageSize) < data.total;
        return {
          data: sharedSamples,
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
          });
        }
        return throwError(() => appError)
      })
    )
  }
  listLatestSharedEditSamples(dto: LatestRequestDTO): Observable<PaginatedSharedEditSamplesResponseDTO> {
    let params = new HttpParams()
      .set('limit', dto.limit.toString())
    return this.http.get<PaginatedResponseDTO<SharedEditSampleResponseDTO>>('/community/latest-edit-samples', { params }).pipe(
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
          });
        }
        return throwError(() => appError)
      })
    )
  }

  likeToSharedSample(sampleID: string): Observable<LikeSharedSampleResponseDto> {
    return this.http.patch<LikeSharedSampleResponseDto>(`/community/like/${sampleID}`, null).pipe(
      catchError((err: unknown) => { 
        let appError: AppBaseError;
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          });
        }
        return throwError(() => appError)
      })
    )
  }
  downloadSample(sampleID: string): Observable<DownloadSampleResponseDto> { 
    return this.http.get<DownloadSampleResponseDto>(`/community/download/${sampleID}`).pipe(
      catchError((err: unknown) => { 
        let appError: AppBaseError;
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          });
        }
        return throwError(() => appError)
      })
    );
  }
}