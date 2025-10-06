import { useLogout } from '@/features/auth/hooks/useLogout.ts'

const LogoutButton = () => {
  const { mutate: logout } = useLogout()

  return (
    <button className='button-blue whitespace-nowrap' onClick={() => logout()}>
      Выйти из аккаунта
    </button>
  )
}

export default LogoutButton
