import LogoutButton
  from "@/features/auth/components/LogoutButton/LogoutButton.tsx";
import {useAuthStore} from "@/features/auth/model/authStore.ts";

const Home = () => {
  const user = useAuthStore(state => state.user)

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