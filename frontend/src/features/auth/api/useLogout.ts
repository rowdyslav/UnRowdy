import { useAuthStore } from '@/app/providers/auth/authStore.ts'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/routes/routes.ts'
import { authApi } from '@/shared/api/auth.ts'
import { useMutation } from '@tanstack/react-query'

export const useLogout = () => {
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      await authApi.logout()
    },

    onSuccess: () => {
      navigate(ROUTES.HOME)
      logout()
    },
  })
}
