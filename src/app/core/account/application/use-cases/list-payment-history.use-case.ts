import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { AccountPort, PaymentHistoryPaginatedDTO } from "../ports/account.port";

@Injectable()
export class ListPaymentHistoryUseCase {
  constructor(private accountPort: AccountPort) { }

  public execute(dto: PaginatedRequestDTO): Observable<PaymentHistoryPaginatedDTO> {
    return this.accountPort.listPaymentHistory(dto).pipe(
      take(1),
    );
  }
}