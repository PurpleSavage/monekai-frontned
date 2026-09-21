import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { AccountPort, PaymentHistoryPaginatedDTO } from "../../application/ports/account.port";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { PaymentHistoryResponseDto } from "../../application/dtos/responses/payment-history-response.dto";
import { AppBaseError } from "../../../shared/common/infrastructure/http-errors/app-base.error";
import { toPaymentHistoryEntity } from "../infra-mappers/to-payment-history-entity.mapper";

@Injectable()
export class AccountHttpService implements AccountPort {
  constructor(private http: HttpClient) { }

  listPaymentHistory(dto: PaginatedRequestDTO): Observable<PaymentHistoryPaginatedDTO> {
    const params = new HttpParams()
      .set('page', dto.page.toString())
      .set('limit', dto.limit.toString());

    return this.http.get<PaymentHistoryResponseDto>('/account/payments/history', { params }).pipe(
      map((data) => {
        const items = data.data.map((item) => toPaymentHistoryEntity(item));
        const hasMore = (data.page * data.limit) < data.total;
        return {
          data: items,
          total: data.total,
          page: data.page,
          limit: data.limit,
          hasMore,
        };
      }),
      catchError((err: unknown) => {
        let appError: AppBaseError;
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0,
          });
        }
        return throwError(() => appError);
      }),
    );
  }
}