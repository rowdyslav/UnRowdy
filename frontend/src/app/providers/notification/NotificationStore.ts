import { create } from 'zustand'
import type { NotificationStoreType } from '@/app/providers/notification/types.ts'

const NOTIFICATION_TIMEOUT_MS = 3000
const NOTIFICATION_FADE_OUT_MS = 300

export const useNotificationStore = create<NotificationStoreType>((set, get) => {
  let nextId = 0
  const hideTimers = new Map<number, ReturnType<typeof setTimeout>>()
  const removeTimers = new Map<number, ReturnType<typeof setTimeout>>()

  const clearTimersById = (id: number) => {
    const hideTimer = hideTimers.get(id)
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimers.delete(id)
    }

    const removeTimer = removeTimers.get(id)
    if (removeTimer) {
      clearTimeout(removeTimer)
      removeTimers.delete(id)
    }
  }

  const removeById = (id: number) => {
    clearTimersById(id)

    set(state => ({
      notifications: state.notifications.filter(notification => notification.id !== id),
    }))
  }

  const startExit = (id: number) => {
    set(state => ({
      notifications: state.notifications.map(notification =>
        notification.id === id ? { ...notification, isExiting: true } : notification,
      ),
    }))

    if (removeTimers.has(id)) {
      return
    }

    const removeTimer = setTimeout(() => {
      removeById(id)
    }, NOTIFICATION_FADE_OUT_MS)

    removeTimers.set(id, removeTimer)
  }

  return {
    notifications: [],

    clearNotification: () => {
      hideTimers.forEach(timer => clearTimeout(timer))
      removeTimers.forEach(timer => clearTimeout(timer))
      hideTimers.clear()
      removeTimers.clear()
      set({ notifications: [] })
    },

    removeNotification: removeById,

    showNotification: (content, type) => {
      const id = ++nextId

      set(state => ({
        notifications: [{ id, content, type, isExiting: false }, ...state.notifications],
      }))

      const hideTimer = setTimeout(() => {
        hideTimers.delete(id)
        startExit(id)
      }, NOTIFICATION_TIMEOUT_MS)

      hideTimers.set(id, hideTimer)
    },

    showSuccess: content => get().showNotification(content, 'success'),
    showError: content => get().showNotification(content, 'error'),
  }
})
