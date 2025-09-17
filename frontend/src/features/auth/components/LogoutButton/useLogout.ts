import {api} from "@/shared/api/axios.ts";
import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";

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
      navigate(ROUTES.AUTH)
    }
  }
}
