import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import AddFriend from '@/features/friends/ui/AddFriend.tsx'
import FriendRequestsList from '@/features/friends/ui/FriendRequestsList.tsx'
import FriendsList from '@/features/friends/ui/FriendsList.tsx'

const FriendsSection = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return (
    <section className='container flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Друзья</h3>

      {isMyProfile && (
        <>
          <AddFriend />
          <FriendRequestsList type='sent' label='Отправленные заявки в друзья' />
          <FriendRequestsList type='received' label='Полученные заявки в друзья' />
        </>
      )}

      <FriendsList canManageFriends={isMyProfile} />
    </section>
  )
}

export default FriendsSection
