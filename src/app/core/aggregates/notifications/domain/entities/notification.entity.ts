import { TypeNotification } from "../enums/type-notifications"

export interface NotificationEntity<T> { 
  data: T 
  id: string
  type: TypeNotification
  title: string
  message: string
  status: string
  referenceId: string
  createdAt: string
  userId: string
  email: string
}

