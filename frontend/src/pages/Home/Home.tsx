import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import {Link} from "react-router-dom";
import ThemeToggleButton from "@/widgets/themeToggleButton/ThemeToggleButton.tsx";

const Home = () => {
  const user = useAuthStore(state => state.user)

  return (
    <div className='flex gap-x-6 flex-wrap'>
      Home
       {user ? <p>Ваш Ник: {user.username}</p> : null}
       {user ? <p>Ваша почта: {user.email}</p> : null}
      <Link to='/test' className='bg-blue-900 text-white p-5'>To test page</Link>
      <ThemeToggleButton></ThemeToggleButton>
    </div>
  )
}

export default Home