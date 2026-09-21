export interface PaymentHistoryItemResponseDto {
  id: string;
  createdAt: string;
  credits: number;
  amountCents: number;
  currency: string;
  status: string;
}