import axios from 'axios'
import { useAuthStore } from '@/app/providers/auth/authStore.ts'
import { useNotificationStore } from '@/app/providers/notification/NotificationStore.ts'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// при наличии access_token подставляется заголовок Authorization: Bearer eyJhb...
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const handleUnauthorized = () => {
  useAuthStore.getState().logout()
  useNotificationStore.getState().showError('Требуется повторный вход')
}

//проверка жизни токена

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      handleUnauthorized()
    }
    return Promise.reject(error)
  },
)
