import {NotificationsResponseDTO} from "../../application/dtos/responses/notifications-response.dto"
import {NotificationEntity} from "../../domain/entities/notification.entity"

export function toNotificationEntity<T>(data: NotificationsResponseDTO<T>[]): NotificationEntity<T>[] {
  return data.map(item => ({
    data: item.data,
    id: item.id,
    type: item.type,
    title: item.title,
    message: item.message,
    status: item.status,
    referenceId: item.referenceId,
    createdAt: item.createdAt,
    userId: item.userId,
    email: item.email,
  }));
}