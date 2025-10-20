import LogoutButton from '@/features/auth/components/LogoutButton.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import UserCard from '@/widgets/userCard/UserCard.tsx'

const UserCardSection = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const profile = useProfileStore(state => state.profile)

  return (
    <section className='container mb-8'>
      <UserCard name={profile?.username || ''} className='h-36'>
        {isMyProfile && <LogoutButton />}
      </UserCard>
    </section>
  )
}

export default UserCardSection
