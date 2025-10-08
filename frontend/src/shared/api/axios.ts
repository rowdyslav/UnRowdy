import axios from 'axios'
import { useAuthStore } from '@/app/providers/auth/authStore.ts'

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
  const logout = useAuthStore.getState().logout
  logout()
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
