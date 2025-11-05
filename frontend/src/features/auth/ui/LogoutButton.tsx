import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/shared/routes/routes.ts";

const LogoutButton = () => {
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate(ROUTES.HOME)
    logout()
  }

  return (
    <button className='button-blue whitespace-nowrap' onClick={handleLogout}>
      Выйти из аккаунта
    </button>
  )
}

export default LogoutButton
