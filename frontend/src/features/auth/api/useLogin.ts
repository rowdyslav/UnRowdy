import { useAuthStore } from '@/app/providers/auth/authStore.ts'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/routes/routes.ts'
import type { LoginFormType } from '@/features/auth/model/LoginForm.schema.ts'
import { authApi } from '@/shared/api/auth.ts'
import { useMutation } from '@tanstack/react-query'
import { toLoginError } from '@/features/auth/api/authError.ts'

export const useLogin = () => {
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()

  return useMutation<void, Error, LoginFormType>({
    mutationFn: async data => {
      try {
        const { data: tokenData } = await authApi.login(data)
        login(tokenData.access_token)
      } catch (err) {
        throw toLoginError(err)
      }
    },

    onSuccess: () => {
      navigate(ROUTES.PROFILE)
    },
  })
}
