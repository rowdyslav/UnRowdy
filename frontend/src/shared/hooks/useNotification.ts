import { createContext, useContext } from 'react'
import type { NotificationContextValue } from '@/app/providers/Notification/types.ts'

export const NotificationContext = createContext<NotificationContextValue | null>(null)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification должен использоваться внутри NotificationProvider')

  return context
}
