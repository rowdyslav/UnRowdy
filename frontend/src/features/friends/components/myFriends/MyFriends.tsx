import {useGetMyFriends} from "@/features/friends/lib/useGetMyFriends.ts";
import Spinner from "@/shared/ui/Spinner.tsx";
import FriendCard from "@/features/friends/ui/friendCard/FriendCard.tsx";

const MyFriends = () => {
  const {myFriends, loading} = useGetMyFriends()

  return (
    <ul className='gap-y-3.5 flex flex-col'>
      {loading ? <div className='in-center'><Spinner/></div> : null}

      {myFriends && !loading
        ? myFriends.map((friend) => (
          <li key={friend.id}><FriendCard
            name={friend.username} id={friend.id}
          />
          </li>
        ))
        : null}
    </ul>
  );
};

export default MyFriends;