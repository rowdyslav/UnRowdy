import NoFriendsCard from '@/features/friends/ui/NoFriendsCard.tsx'
import { useFriends } from '@/features/friends/hooks/useFriends.ts'
import FriendCard from '@/features/friends/ui/FriendCard.tsx'
import Spinner from '@/shared/ui/Spinner.tsx'
import ViewProfileButton from '@/shared/components/ViewProfileButton.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import DeleteButton from '@/features/friends/components/RemoveButton.tsx'

const ActiveList = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const { data: friendsData, isLoading } = useFriends()

  if (isLoading) return <Spinner />

  return (
    <ul className='gap-y-3.5 flex flex-col'>
      {friendsData && friendsData.length === 0 && <NoFriendsCard />}

      {friendsData &&
        friendsData.map(friend => (
          <li key={friend.id}>
            <FriendCard name={friend.username}>
              <ViewProfileButton username={friend.username} />
              {isMyProfile && <DeleteButton id={friend.id} />}
            </FriendCard>
          </li>
        ))}
    </ul>
  )
}

export default ActiveList
