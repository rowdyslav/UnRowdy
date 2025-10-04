import SentRequests from '@/features/friends/components/RequestListOut.tsx'
import RequestListIn from '@/features/friends/components/RequestListIn.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import ActiveList from '@/features/friends/components/ActiveList.tsx'
import Add from '@/features/friends/components/Add.tsx'

const FriendsSection = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return (
    <section className='container flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Друзья</h3>

      {isMyProfile && (
        <>
          <Add />
          <RequestListIn />
          <SentRequests />
        </>
      )}

      <ActiveList />
    </section>
  )
}

export default FriendsSection
