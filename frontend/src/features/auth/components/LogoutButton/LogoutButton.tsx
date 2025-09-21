import {useLogout} from "@/features/auth/components/LogoutButton/useLogout.ts";
import type {ReactNode} from "react";

const LogoutButton = ({label}: {label?: ReactNode }) => {
  const { mutate: logout } = useLogout();

  return (
    <button className='button-blue whitespace-nowrap' onClick={() => logout()}>
      {label ? label : 'Выйти из аккаунта'}
    </button>
  );
};

export default LogoutButton;