import { useLogin } from '@/features/auth/api/useLogin.ts'
import type { AxiosError } from 'axios'
import type { RegisterFormType } from '@/features/auth/model/RegisterForm.schema.ts'
import type { ErrorResponseType } from '@/shared/types/errorResponseType.ts'
import { authApi } from '@/shared/api/auth.ts'
import { useMutation } from '@tanstack/react-query'

export const useRegister = () => {
  const { mutate: loginMutation } = useLogin()

  return useMutation<void, string, RegisterFormType>({
    mutationFn: async data => {
      try {
        await authApi.register(data)
        loginMutation(data)
      } catch (err) {
        const error = err as AxiosError<ErrorResponseType>

        if (error.response?.data?.detail === 'REGISTER_USER_ALREADY_EXISTS') {
          throw 'На этот Email уже зарегистрирован пользователь'
        }
        throw 'Ошибка регистрации'
      }
    },
  })
}
