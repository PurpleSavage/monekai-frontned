import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationsPort } from "../../application/ports/notifications.port";
import { NotificationEntity } from "../../domain/entities/notification.entity";
import { catchError, map, Observable } from "rxjs";
import { PaginatedRequestDTO } from "../../../../shared/common/application/dtos/requests/paginated-request.dto";
import { PaginatedNotificationsResponseDTO } from "../../application/dtos/responses/paginated-notifications-response.dto";
import { AppBaseError } from "../../../../shared/common/infrastructure/http-errors/app-base.error";
import { PaginatedResponseDTO } from "../../../../shared/common/application/dtos/responses/paginated-response.dto";
import { toNotificationEntity } from "../infra-mappers/to-notification-entity.mapper";
import { NotificationMarkResponseDTO } from "../../application/dtos/responses/notification-marked-response.dto";

@Injectable()
export class NotificationsHttpService implements NotificationsPort{
  constructor(private http: HttpClient) { }
  
  getNotifications<T>(dto: PaginatedRequestDTO): Observable<PaginatedResponseDTO<NotificationEntity<T>>> {
    let params = new HttpParams()
      .set('page', dto.page.toString())
      .set('limit', dto.limit.toString())
    
    return this.http.get<PaginatedNotificationsResponseDTO<T>>("/notifications/all", { params }).pipe(
      map(response => { 
        const notificationData= toNotificationEntity<T>(response.data)
        return {
          data: notificationData,
          total: response.total,
          page: response.page,
          pageSize: response.pageSize,
          hasMore: response.hasMore,
        }
      }),
      catchError((err: unknown) => { 
        let appError: AppBaseError
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          })
        }
        throw appError
      })
    )
  }
  markAsRead(id: string): Observable<NotificationMarkResponseDTO> {
    return this.http.patch<NotificationMarkResponseDTO>(`/notifications/${id}/read`, null).pipe(
      map(response => { 
        return response
      }),
      catchError((err: unknown) => { 
        let appError: AppBaseError
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          })
        }
        throw appError
      })
    )
  }
  markAllAsRead(ids: string[]): Observable<NotificationMarkResponseDTO[]> {
    return this.http.patch<NotificationMarkResponseDTO[]>(`/notifications/read-all`, {notificationIds:ids}).pipe(
      map(response => { 
        return response
      }),
      catchError((err: unknown) => { 
        let appError: AppBaseError
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          })
        }
        throw appError
      })
    )
  }
  
}