import Spinner from "@/shared/ui/Spinner.tsx";
import FriendCard from "@/features/friends/ui/Card.tsx";
import type {
  ActiveListProps
} from "@/features/friends/types/activeListProps.ts";

const ActiveList = ({activeFriends, isLoading, type}: ActiveListProps) => {

  if (isLoading) {
    return <div className='center'><Spinner/></div>
  }

  return (
    <ul className='gap-y-3.5 flex flex-col'>

      {activeFriends.length === 0 && (
        <div
          className='card-element center-inline p-3 color-font-light'
        >В данный момент у вас нет друзей :(</div>)
      }

      {activeFriends.map((friend) => (
        <li key={friend.id}>
          <FriendCard
            name={friend.username} id={friend.id} type={type}
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveList;