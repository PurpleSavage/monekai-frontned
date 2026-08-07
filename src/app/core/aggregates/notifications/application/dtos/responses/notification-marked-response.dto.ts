import {type  NotificationStatusType } from "../../../domain/enums/notification-status"


export interface NotificationMarkResponseDTO {
	notificationId: string
	statusNotification: NotificationStatusType
}