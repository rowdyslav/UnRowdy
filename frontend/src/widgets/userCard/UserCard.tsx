import LogoutButton from '@/features/auth/components/LogoutButton.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'

const UserCard = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const profile = useProfileStore(state => state.profile)

  return (
    <article className='card-element p-6 flex gap-x-4'>
      <img src='/public/icons/accCircle2.svg' alt='' height={100} width={100} />

      <div className='flex flex-col gap-y-2'>
        {profile && <p className='text-3xl font-bold color-font'>{profile.username}</p>}
        {profile && <p className='color-font-light text-lg'>Очень крутой разработчик</p>}
      </div>

      {isMyProfile && (
        <div className='ml-auto pt-8'>
          <LogoutButton />
        </div>
      )}
    </article>
  )
}

export default UserCard
