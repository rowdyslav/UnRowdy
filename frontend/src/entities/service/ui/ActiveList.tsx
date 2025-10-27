import NoFriendsCard from '@/entities/user/ui/NoFriendsCard.tsx'
import { useFriends } from '@/entities/user/api/useFriends.ts'
import UserCard from '@/entities/user/ui/userCard/UserCard.tsx'
import ViewProfileButton from '@/shared/components/ViewProfileButton.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import DeleteButton from '@/features/friends/ui/RemoveButton.tsx'
import { Skeleton } from '@/shared/ui/Skeleton.tsx'

const ActiveList = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const { data: friendsData, isLoading } = useFriends()

  if (isLoading) return <Skeleton className='h-20' />

  return (
    <ul className='gap-y-3.5 flex flex-col'>
      {friendsData && friendsData.length === 0 && <NoFriendsCard />}

      {friendsData &&
        friendsData.map(friend => (
          <li key={friend.id}>
            <UserCard name={friend.username}>
              <ViewProfileButton username={friend.username} />
              {isMyProfile && <DeleteButton id={friend.id} />}
            </UserCard>
          </li>
        ))}
    </ul>
  )
}

export default ActiveList
