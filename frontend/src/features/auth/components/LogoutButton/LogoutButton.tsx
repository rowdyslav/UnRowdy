import {useAuthStore} from "@/features/auth/model/authStore.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/app/router/routes.ts";

const LogoutButton = () => {
const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate(ROUTES.AUTH);
  }

  return (
    <button onClick={handleClick}>
      Выйти из аккаунта
    </button>
  );
};

export default LogoutButton;