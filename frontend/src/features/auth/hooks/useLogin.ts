import { useAuthStore } from '@/app/providers/auth/authStore.ts'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/const/routes.ts'
import type { LoginFormType } from '@/features/auth/types/LoginForm.schema.ts'
import type { ErrorResponseType } from '@/shared/types/errorResponseType.ts'
import { authApi } from '@/shared/api/auth.ts'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()

  return useMutation<void, string, LoginFormType>({
    mutationFn: async data => {
      try {
        const { data: tokenData } = await authApi.login(data)
        login(tokenData.access_token)
      } catch (err) {
        const error = err as AxiosError<ErrorResponseType>

        if (error.response?.data?.detail === 'LOGIN_BAD_CREDENTIALS') {
          throw 'Неверный email или пароль'
        }
        throw 'Ошибка авторизации'
      }
    },

    onSuccess: () => {
      navigate(ROUTES.PROFILE)
    },
  })
}
