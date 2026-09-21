import { Observable } from "rxjs";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { PaymentHistoryEntity } from "../../domain/entities/payment-history.entity";

export interface PaymentHistoryPaginatedDTO {
  data: PaymentHistoryEntity[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export abstract class AccountPort {
  abstract listPaymentHistory(dto: PaginatedRequestDTO): Observable<PaymentHistoryPaginatedDTO>;
}