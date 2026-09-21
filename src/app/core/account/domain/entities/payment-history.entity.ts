import { PaymentStatusVO } from "../../../payments/domain/value-objects/payment-status.vo";

export interface PaymentHistoryEntity {
  id: string;
  date: string;
  credits: number;
  cost: number;
  currency: string;
  status: PaymentStatusVO;
}