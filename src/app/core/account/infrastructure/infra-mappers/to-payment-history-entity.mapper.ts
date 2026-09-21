import { PaymentHistoryItemResponseDto } from "../../application/dtos/responses/payment-history-item-response.dto";
import { PaymentHistoryEntity } from "../../domain/entities/payment-history.entity";
import { PaymentStatusVO } from "../../../payments/domain/value-objects/payment-status.vo";

const ACCEPTED_STATUSES = ['paid', 'completed', 'billed'];
const REJECTED_STATUSES = ['failed', 'canceled', 'refunded', 'past_due'];

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toISOString().slice(0, 10);
}

function mapPaymentStatus(status: string): PaymentStatusVO {
  const normalized = status.toLowerCase();
  if (ACCEPTED_STATUSES.includes(normalized)) return 'accepted';
  if (REJECTED_STATUSES.includes(normalized)) return 'rejected';
  return 'pending';
}

export function toPaymentHistoryEntity(item: PaymentHistoryItemResponseDto): PaymentHistoryEntity {
  return {
    id: item.id,
    date: formatDate(item.createdAt),
    credits: item.credits,
    cost: item.amountCents / 100,
    currency: item.currency,
    status: mapPaymentStatus(item.status),
  };
}