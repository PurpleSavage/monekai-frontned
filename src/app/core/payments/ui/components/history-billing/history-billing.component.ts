import { Component } from "@angular/core";
import { PaymentHistoryItemDto } from "../../../application/dtos/responses/payment-history-item.dto";
import { PaymentStatusVO } from "../../../domain/value-objects/payment-status.vo";

@Component({
  selector: 'app-history-billing',
  templateUrl: './history-billing.component.html',
  standalone: true
})
export class HistoryBillingComponent {
  public readonly title = 'Purchase history';
  public readonly subtitle = 'All your credit purchases with their date, cost and current status.';

  public readonly history: PaymentHistoryItemDto[] = [
    { id: 'pay_001', date: '2026-08-14', credits: 500, cost: 24.99, currency: 'USD', status: 'accepted' },
    { id: 'pay_002', date: '2026-07-02', credits: 250, cost: 12.99, currency: 'USD', status: 'rejected' },
    { id: 'pay_003', date: '2026-06-18', credits: 1000, cost: 49.99, currency: 'USD', status: 'pending' },
    { id: 'pay_004', date: '2026-05-30', credits: 100, cost: 5.99, currency: 'USD', status: 'accepted' },
    { id: 'pay_005', date: '2026-04-11', credits: 250, cost: 12.99, currency: 'USD', status: 'accepted' },
  ];

  public statusLabelClass(status: PaymentStatusVO): string {
    const classesByStatus: Record<PaymentStatusVO, string> = {
      accepted: 'text-accepted-status',
      rejected: 'text-rejected-status',
      pending: 'text-pending-status'
    };
    return classesByStatus[status];
  }
}
