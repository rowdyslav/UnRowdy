import {useSendFriends} from "@/features/friends/lib/useSendFriends.ts";
import {
  useRequestFriends
} from "@/features/friends/lib/useGetRequestsFriends.ts";

const AcceptButton = ({id}: {id :string}) => {
  const {addFriend} = useSendFriends()
  const {refetch} = useRequestFriends()

  const handleAccept = async (id: string ) => {
    await addFriend(id)
    await refetch()
  }

  return (
    <button
      className='button-blue bg-green-400'
      onClick={() => handleAccept(id)}
    >
      Принять
    </button>
  );
};

export default AcceptButton;