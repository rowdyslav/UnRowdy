import { useProfileStore } from '@/app/providers/profile/userStore.ts'

const NoFriendsCard = () => {
  const profile = useProfileStore(state => state.profile)
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return (
    <div className='card-element center-inline p-3 color-font-light'>
      {isMyProfile
        ? 'В данный момент у вас нет друзей :('
        : `В данный момент у пользователя ${profile?.username} нет друзей :(`}
    </div>
  )
}

export default NoFriendsCard
