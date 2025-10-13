export type NotificationContextValue = {
  showSuccess: (message: string) => void
  showError: (message: string) => void
}

export type NotificationType = 'success' | 'error' | null

export type NotificationState = {
  type: NotificationType
  message: string
}
