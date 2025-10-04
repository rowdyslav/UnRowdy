import type { UserCardProps } from '@/widgets/userCard/userCardProps.ts'
import LogoutButton from '@/features/auth/components/LogoutButton.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'

const UserCard = ({ username }: UserCardProps) => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return (
    <article className='card-element p-6 flex gap-x-6'>
      <div style={{ fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0 , 'opsz' 48" }}>
        <span className='material-symbols-outlined' style={{ fontSize: '100px' }}>
          account_circle
        </span>
      </div>

      <div className='flex flex-col gap-y-2'>
        {username && <p className='text-3xl font-bold color-font'>{username}</p>}
        {username && <p className='color-font-light text-lg'>Очень крутой разработчик</p>}
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
