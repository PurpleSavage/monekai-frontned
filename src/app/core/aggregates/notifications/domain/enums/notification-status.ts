export const NotificationStatus = {
  Unread: 'unread',
  Read: 'read',  
}
export type NotificationStatusType = typeof NotificationStatus[keyof typeof NotificationStatus]