import { PaymentStatusVO } from "../../../domain/value-objects/payment-status.vo";

export interface PaymentHistoryItemDto {
  id: string;
  date: string;
  credits: number;
  cost: number;
  currency: string;
  status: PaymentStatusVO;
}
