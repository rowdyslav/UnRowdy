import {useSendFriends} from "@/features/friends/lib/useSendFriends.ts";

const AcceptButton = ({id}: {id :string}) => {
  const {mutate: addFriend} = useSendFriends()

  return (
    <button
      className='button-blue bg-green-400 h-10 flex items-center'
      onClick={() => addFriend(id)}
    >
      Принять
    </button>
  );
};

export default AcceptButton;