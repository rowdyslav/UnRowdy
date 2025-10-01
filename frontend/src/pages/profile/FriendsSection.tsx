import {useParams} from "react-router-dom";
import ActiveList
  from "@/features/friends/components/ActiveList.tsx";
import type {ProfileType} from "@/shared/types/profileType.ts";
import AddForm from "@/features/friends/components/AddForm.tsx";
import RequestListIn from "@/features/friends/components/RequestListIn.tsx";
import SentRequests from "@/features/friends/components/RequestListOut.tsx";
import {useFriends} from "@/features/friends/hooks/useFriends.ts";

const FriendsSection = ({type}: ProfileType) => {
  const {id} = useParams()

  const {data: friendData, isLoading} = useFriends(id || '')

  return (
    <section className='container flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Друзья</h3>

      {type === 'myProfile' &&
        <>
          <AddForm/>
          <RequestListIn/>
          <SentRequests/>
        </>}

      <ActiveList
        activeFriends={friendData || []} isLoading={isLoading} type={type}
      />
    </section>
  );
};

export default FriendsSection;