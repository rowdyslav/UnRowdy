import LogoutButton
  from "@/features/auth/components/LogoutButton/LogoutButton.tsx";

const Home = () => {

  return (
    <div className='flex gap-x-6 flex-wrap container'>
      Home
      <LogoutButton/>
    </div>
  )
}

export default Home