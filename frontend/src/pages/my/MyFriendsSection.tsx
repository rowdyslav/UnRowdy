import ActiveList
  from "@/features/friends/components/ActiveList.tsx";
import AddForm
  from "@/features/friends/components/AddForm.tsx";
import RequestListIn
  from "@/features/friends/components/RequestListIn.tsx";
import SentRequests
  from "@/features/friends/components/RequestListOut.tsx";
import {useMyFriends} from "@/features/friends/lib/useMyFriends.ts";

const FriendsSection = () => {
  const {data: friendData, isLoading} = useMyFriends()

  return (
    <section className='container flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Друзья</h3>
      <AddForm/>
      <RequestListIn/>
      <SentRequests/>
      <ActiveList
        activeFriends={friendData || []} isLoading={isLoading} type='myProfile'
      />
    </section>
  );
};

export default FriendsSection;