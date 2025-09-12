import {useLogout} from "@/features/auth/components/LogoutButton/useLogout.ts";

const LogoutButton = () => {
  return (
    <button className='button-form' onClick={useLogout}>
      Выйти из аккаунта
    </button>
  );
};

export default LogoutButton;