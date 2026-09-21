import { PaymentHistoryItemResponseDto } from "./payment-history-item-response.dto";

export interface PaymentHistoryResponseDto {
  total: number;
  page: number;
  limit: number;
  data: PaymentHistoryItemResponseDto[];
}