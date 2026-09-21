import { Component, OnInit, inject } from "@angular/core";
import { ListPaymentHistoryUseCase } from "../../../application/use-cases/list-payment-history.use-case";
import { PaymentHistoryStateService } from "../../../state-manager/payment-history-state.service";
import { AppBaseError } from "../../../../shared/common/infrastructure/http-errors/app-base.error";
import { PaymentStatusVO } from "../../../../payments/domain/value-objects/payment-status.vo";

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  standalone: true,
  providers: [PaymentHistoryStateService],
})
export class PaymentHistoryComponent implements OnInit {
  private readonly listPaymentHistory = inject(ListPaymentHistoryUseCase);
  private readonly paymentHistoryState = inject(PaymentHistoryStateService);

  private readonly PAGE_SIZE = 10;

  protected readonly title = 'Payment history';
  protected readonly subtitle =
    'All your credit purchases with their date, cost and current status.';

  protected readonly history = this.paymentHistoryState.paymentHistory;
  protected readonly isLoading = this.paymentHistoryState.paymentHistoryLoading;
  protected readonly error = this.paymentHistoryState.paymentHistoryError;
  protected readonly skeletons = Array(5);

  ngOnInit(): void {
    this.loadPaymentHistory();
  }

  private loadPaymentHistory(): void {
    this.paymentHistoryState.setLoading(true);
    this.paymentHistoryState.setError('');

    this.listPaymentHistory.execute({ limit: this.PAGE_SIZE, page: 1 }).subscribe({
      next: (res) => {
        this.paymentHistoryState.setPaymentHistory(res.data);
      },
      error: (err: unknown) => {
        this.paymentHistoryState.setError(
          err instanceof AppBaseError ? err.message : 'Error loading payment history',
        );
      },
      complete: () => {
        this.paymentHistoryState.setLoading(false);
      },
    });
  }

  public retry(): void {
    this.loadPaymentHistory();
  }

  public statusLabelClass(status: PaymentStatusVO): string {
    const classesByStatus: Record<PaymentStatusVO, string> = {
      accepted: 'text-accepted-status',
      rejected: 'text-rejected-status',
      pending: 'text-pending-status',
    };
    return classesByStatus[status];
  }
}