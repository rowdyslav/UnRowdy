import {api} from "@/shared/api/axios.ts";
import {useAuthStore} from "@/features/auth/model/authStore.ts";

export const useLogout = async () => {
  try {
    await api.post('/auth/logout')
  }
  catch (err: unknown) {
    if (err) console.warn(err)

    console.warn("Logout error");
  }
  finally {
    useAuthStore.getState().logout() //очистка стора
  }
}
