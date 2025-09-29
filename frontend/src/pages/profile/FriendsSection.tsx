import {useFriends} from "@/features/friends/lib/useFriends.ts";
import {useParams} from "react-router-dom";
import ActiveList
  from "@/features/friends/components/ActiveList.tsx";

const FriendsSection = () => {
  const {id} = useParams()
  const {data: friendData, isLoading} = useFriends(id || '')

  console.log(id)
  console.log(friendData)

  return (
    <section className='container flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Друзья</h3>
      <ActiveList
        activeFriends={friendData || []} isLoading={isLoading} type='profile'
      />
    </section>
  );
};

export default FriendsSection;