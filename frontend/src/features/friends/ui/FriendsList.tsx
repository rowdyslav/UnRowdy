import { useFriends } from '@/entities/user/api/useFriends.ts'
import NoFriendsCard from '@/entities/user/ui/NoFriendsCard.tsx'
import UserCard from '@/entities/user/ui/userCard/UserCard.tsx'
import RemoveButton from '@/features/friends/ui/RemoveButton.tsx'
import ViewProfileButton from '@/shared/components/ViewProfileButton.tsx'
import { Skeleton } from '@/shared/ui/Skeleton.tsx'

type FriendsListProps = {
  canManageFriends: boolean
}

const FriendsList = ({ canManageFriends }: FriendsListProps) => {
  const { data: friendsData, isLoading } = useFriends()

  if (isLoading) return <Skeleton className='h-20' />

  return (
    <ul className='gap-y-3.5 flex flex-col'>
      {friendsData && friendsData.length === 0 && <NoFriendsCard />}

      {friendsData?.map(friend => (
        <li key={friend.id}>
          <UserCard name={friend.username}>
            <ViewProfileButton username={friend.username} />
            {canManageFriends && <RemoveButton id={friend.id} />}
          </UserCard>
        </li>
      ))}
    </ul>
  )
}

export default FriendsList
