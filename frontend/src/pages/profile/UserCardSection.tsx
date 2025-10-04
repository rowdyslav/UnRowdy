import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import UserCard from '@/widgets/userCard/UserCard.tsx'

const UserCardSection = () => {
  const profile = useProfileStore(state => state.profile)

  return (
    <section className='container mb-8'>
      <UserCard username={profile?.username || 'Не существует'} />
    </section>
  )
}

export default UserCardSection
