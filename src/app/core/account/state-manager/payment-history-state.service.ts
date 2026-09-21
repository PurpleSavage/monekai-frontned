import { Injectable, signal } from "@angular/core";
import { PaymentHistoryEntity } from "../domain/entities/payment-history.entity";

@Injectable()
export class PaymentHistoryStateService {
  public readonly paymentHistory = signal<PaymentHistoryEntity[]>([]);
  public readonly paymentHistoryLoading = signal(false);
  public readonly paymentHistoryError = signal('');

  public setPaymentHistory(history: PaymentHistoryEntity[]): void {
    this.paymentHistory.set(history);
  }

  public setLoading(loading: boolean): void {
    this.paymentHistoryLoading.set(loading);
  }

  public setError(error: string): void {
    this.paymentHistoryError.set(error);
  }
}