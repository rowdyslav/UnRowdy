import {api} from "@/shared/api/axios.ts";
import {useAuthStore} from "@/features/auth/model/authStore.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/app/router/routes.ts";

export const useLogout = () => {
  const navigate = useNavigate()

  return async () => {
    try {
      await api.post('/auth/logout')

    } catch (err: unknown) {
      if (err) console.warn(err)
      console.warn("Logout error")

    } finally {
      useAuthStore.getState().logout()
      navigate(ROUTES.HOME)
    }
  }
}
