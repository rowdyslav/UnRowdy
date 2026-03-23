import type { TokenType } from '@/shared/types/tokenType.ts'
import { api } from '@/shared/api/axios.ts'
import type { LoginPayload, RegisterPayload } from '@/shared/api/auth/types.ts'

export const authApi = {
  login: (data: LoginPayload) => {
    const formData = new URLSearchParams()
    formData.append('username', data.email)
    formData.append('password', data.password)

    return api.post<TokenType>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },

  register: (data: RegisterPayload) => {
    const formData = new URLSearchParams()
    formData.append('username', data.email)
    formData.append('password', data.password)
    formData.append('actually_username', data.username)

    return api.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },

  logout: () => api.post('/auth/logout'),
}
