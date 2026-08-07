import { Observable } from "rxjs";
import { type NotificationEntity } from "../../domain/entities/notification.entity";
import { NotificationMarkResponseDTO } from "../dtos/responses/notification-marked-response.dto";
import { PaginatedRequestDTO } from "../../../../shared/common/application/dtos/requests/paginated-request.dto";
import { PaginatedResponseDTO } from "../../../../shared/common/application/dtos/responses/paginated-response.dto";

export abstract class NotificationsPort {
  abstract getNotifications<T>(dto: PaginatedRequestDTO): Observable<PaginatedResponseDTO<NotificationEntity<T>>>
  abstract markAsRead(id: string): Observable<NotificationMarkResponseDTO>
  abstract markAllAsRead(ids:string[]):Observable<NotificationMarkResponseDTO []>
}