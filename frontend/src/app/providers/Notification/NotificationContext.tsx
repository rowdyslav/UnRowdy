import type { NotificationState } from '@/app/providers/Notification/types.ts'
import { NotificationContext } from '@/shared/hooks/useNotification'
import { Notification } from '@/shared/components/Notification.tsx'
import { type ReactNode, useCallback, useState } from 'react'

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationState>({ message: '', type: null })

  const showSuccess = useCallback((message: string) => {
    setNotification({ message, type: 'success' })
    setTimeout(() => setNotification({ message: '', type: null }), 3000)
  }, [])

  const showError = useCallback((message: string) => {
    setNotification({ message, type: 'error' })
    setTimeout(() => setNotification({ message: '', type: null }), 3000)
  }, [])

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      <Notification type={notification.type} message={notification.message} />
      {children}
    </NotificationContext.Provider>
  )
}
