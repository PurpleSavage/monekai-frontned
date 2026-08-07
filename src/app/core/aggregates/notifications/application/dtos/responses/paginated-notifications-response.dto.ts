import { PaginatedResponseDTO } from "../../../../../shared/common/application/dtos/responses/paginated-response.dto";
import { NotificationsResponseDTO } from "./notifications-response.dto";

export interface PaginatedNotificationsResponseDTO<T> extends PaginatedResponseDTO<NotificationsResponseDTO<T>> {}