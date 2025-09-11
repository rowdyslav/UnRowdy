import LogoutButton
  from "@/features/auth/components/LogoutButton/LogoutButton.tsx";
import {useAuthStore} from "@/features/auth/model/authStore.ts";

const Home = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const token = useAuthStore(state => state.token)
  const user = useAuthStore(state => state.user)

  console.log('isAuthenticated:', isAuthenticated)
  console.log('token:', token)
  console.log('user:', user)


  return (
    <div className='flex gap-x-6'>
      Home
      <LogoutButton/>
      {user ? <p>{user.username}</p> : null}
      {user ? <p>{user.email}</p> : null}
      {user ? <p>ваш уникальный id: {user.id}</p> : null}
    </div>
  )
}

export default Home