import RequestList from '@/features/friends/components/RequestList.tsx'
import {useProfileStore} from '@/app/providers/profile/userStore.ts'
import ActiveList from '@/features/friends/components/ActiveList.tsx'
import AddFriend from '@/features/friends/components/AddFriend.tsx'

const FriendsSection = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return (
    <section className='container flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Друзья</h3>

      {isMyProfile && (
        <>
          <AddFriend/>
          <RequestList type='sent' label='Отправленные заявки в друзья'/>
          <RequestList type='received' label='Полученные заявки в друзья'/>
        </>
      )}

      <ActiveList/>
    </section>
  )
}

export default FriendsSection
