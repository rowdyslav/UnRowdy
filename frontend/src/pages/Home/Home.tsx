import {useAuthStore} from "@/features/auth/model/authStore.ts";

const Home = () => {
  const user = useAuthStore(state => state.user)

  return (
    <div className='flex gap-x-6'>
      Home
      {user ? <p>{user.username}</p> : null}
      {user ? <p>{user.email}</p> : null}
    </div>
  )
}

export default Home