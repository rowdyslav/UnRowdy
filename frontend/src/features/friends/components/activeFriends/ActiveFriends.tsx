import {useActiveFriends} from "@/features/friends/lib/useActiveFriends.ts";
import Spinner from "@/shared/ui/Spinner.tsx";
import FriendCard from "@/features/friends/ui/friendCard/FriendCard.tsx";

const ActiveFriends = () => {
  const {data: activeFriends, isLoading} = useActiveFriends()

  return (
    <ul className='gap-y-3.5 flex flex-col'>
      {isLoading ? <div className='in-center'><Spinner/></div> : null}

      {typeof activeFriends === 'object' && activeFriends.length === 0
        ? <div className='card-element in-center p-3 color-font-light'>В данный момент у вас нет друзей :(</div>
        : null}

      {activeFriends && !isLoading
        ? activeFriends.map((friend) => (
          <li key={friend.id}>
            <FriendCard
              name={friend.username} id={friend.id}
            />
          </li>
        ))
        : null}
    </ul>
  );
};

export default ActiveFriends;