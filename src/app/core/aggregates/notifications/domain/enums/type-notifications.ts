
export const TypeNotifications = {
	ReplicateError: "replicate_error",
	ReplicateSuccess: "replicate_success",
	Payment: "payment",
	Info: "info",
}
export type TypeNotification = typeof TypeNotifications[keyof typeof TypeNotifications]