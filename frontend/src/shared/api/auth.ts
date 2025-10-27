import type { TokenType } from '@/shared/types/tokenType.ts'
import { api } from '@/shared/api/axios.ts'
import type { LoginFormType } from '@/features/auth/model/LoginForm.schema.ts'
import type { RegisterFormType } from '@/features/auth/model/RegisterForm.schema.ts'

export const authApi = {
  login: (data: LoginFormType) => {
    const formData = new URLSearchParams()
    formData.append('username', data.email)
    formData.append('password', data.password)

    return api.post<TokenType>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },

  register: (data: RegisterFormType) => {
    return api.post('/auth/register', { ...data, is_superuser: true })
  },

  logout: () => api.post('/auth/logout'),
}
