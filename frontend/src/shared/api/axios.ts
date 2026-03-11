import axios from 'axios'
import { useAuthStore } from '@/app/providers/auth/authStore.ts'
import { useNotificationStore } from '@/app/providers/notification/NotificationStore.ts'
import { ROUTES } from '@/shared/routes/routes.ts'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

let isHandlingUnauthorized = false

// при наличии access_token подставляется заголовок Authorization: Bearer eyJhb...
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const handleUnauthorized = () => {
  if (isHandlingUnauthorized) {
    return
  }

  isHandlingUnauthorized = true
  useAuthStore.getState().logout()
  useNotificationStore.getState().showError('Требуется повторный вход')

  if (window.location.pathname !== ROUTES.AUTH) {
    window.location.assign(ROUTES.AUTH)
    return
  }

  isHandlingUnauthorized = false
}

// проверка жизни токена
api.interceptors.response.use(
  response => response,
  error => {
    const hasAuthHeader = Boolean(error.config?.headers?.Authorization)
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (error.response?.status === 401 && isAuthenticated && hasAuthHeader) {
      handleUnauthorized()
    }

    return Promise.reject(error)
  },
)
