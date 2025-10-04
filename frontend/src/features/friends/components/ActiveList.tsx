import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import NoFriendsCard from '@/features/friends/ui/NoFriendsCard.tsx'
import { useFriends } from '@/features/friends/model/useFriends.ts'
import FriendCard from '@/features/friends/ui/Card.tsx'
import Spinner from '@/shared/ui/Spinner.tsx'

const ActiveList = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const profile = useProfileStore(state => state.profile)
  const { data: friendsData, isLoading } = useFriends(profile?.id || '')

  if (isLoading) return <Spinner />

  return (
    <ul className='gap-y-3.5 flex flex-col'>
      {friendsData && friendsData.length === 0 && <NoFriendsCard isMyProfile={isMyProfile} />}

      {friendsData &&
        friendsData.map(friend => (
          <li key={friend.id}>
            <FriendCard name={friend.username} id={friend.id} />
          </li>
        ))}
    </ul>
  )
}

export default ActiveList
