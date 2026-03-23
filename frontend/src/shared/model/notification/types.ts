export type NotificationType = 'success' | 'error'

export interface NotificationItem {
  id: number
  type: NotificationType
  content: string
  isExiting: boolean
}

export interface NotificationStoreType {
  notifications: NotificationItem[]

  clearNotification: () => void
  removeNotification: (id: number) => void

  showNotification: (message: string, type: NotificationType) => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
}
