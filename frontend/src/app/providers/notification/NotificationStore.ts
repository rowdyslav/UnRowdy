import { create } from 'zustand'
import type { NotificationStoreType } from '@/app/providers/notification/types.ts'

export const useNotificationStore = create<NotificationStoreType>((set, get) => ({
  type: null,
  content: null,

  clearNotification: () => {
    set({ type: null, content: null })
  },

  showNotification: (content, type) => {
    setTimeout(get().clearNotification, 3000)
    set({ type, content })
  },

  showSuccess: content => get().showNotification(content, 'success'),
  showError: content => get().showNotification(content, 'error'),
}))
