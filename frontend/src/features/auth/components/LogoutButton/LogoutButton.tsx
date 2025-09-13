import {useLogout} from "@/features/auth/components/LogoutButton/useLogout.ts";
import type {ReactNode} from "react";

const LogoutButton = ({label}: {label?: ReactNode }) => {
  const logout = useLogout()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <button className='button-form flex justify-center whitespace-nowrap' onClick={handleLogout}>
      {label ? label : 'Выйти из аккаунта'}
    </button>
  );
};

export default LogoutButton;