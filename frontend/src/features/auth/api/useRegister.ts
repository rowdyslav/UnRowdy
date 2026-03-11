import { useLogin } from '@/features/auth/api/useLogin.ts'
import type { RegisterFormType } from '@/features/auth/model/RegisterForm.schema.ts'
import { authApi } from '@/shared/api/auth.ts'
import { useMutation } from '@tanstack/react-query'
import { toRegisterError } from '@/features/auth/api/authError.ts'

export const useRegister = () => {
  const { mutateAsync: login } = useLogin()

  return useMutation<void, Error, RegisterFormType>({
    mutationFn: async data => {
      try {
        await authApi.register(data)
      } catch (err) {
        throw toRegisterError(err)
      }

      await login(data)
    },
  })
}
