import { useAuthStore } from '@/app/providers/auth/authStore.ts'
import { configureApiClient } from '@/shared/api/axios.ts'
import { useNotificationStore } from '@/shared/model/notification/notificationStore.ts'
import { ROUTES } from '@/shared/routes/routes.ts'

export const configureAppApi = () => {
  configureApiClient({
    getAccessToken: () => useAuthStore.getState().token,
    onUnauthorized: () => {
      useAuthStore.getState().logout()
      useNotificationStore.getState().showError('Требуется повторный вход')

      if (window.location.pathname !== ROUTES.AUTH) {
        window.location.assign(ROUTES.AUTH)
        return false
      }

      return true
    },
  })
}
