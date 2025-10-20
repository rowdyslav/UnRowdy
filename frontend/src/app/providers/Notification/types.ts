type NotificationType = 'success' | 'error' | null

export interface NotificationStoreType {
  type: NotificationType
  content: string | null
  timeoutId: NodeJS.Timeout | null

  clearNotification: () => void

  showNotification: (message: string, type: NotificationType) => void

  showSuccess: (content: string) => void
  showError: (content: string) => void
}
