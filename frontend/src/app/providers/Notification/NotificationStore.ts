import { create } from 'zustand'
import type { NotificationStoreType } from '@/app/providers/Notification/types.ts'

export const useNotificationStore = create<NotificationStoreType>((set, get) => ({
  type: null,
  content: null,
  timeoutId: null,

  clearNotification: () => {
    const { timeoutId } = get()

    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    set({ type: null, content: null, timeoutId: null })
  },

  showNotification: (content, type) => {
    const { clearNotification } = get()
    clearNotification()

    const timeoutId = setTimeout(clearNotification, 3000)

    set({ type, content, timeoutId })
  },

  showSuccess: content => get().showNotification(content, 'success'),
  showError: content => get().showNotification(content, 'error'),
}))
