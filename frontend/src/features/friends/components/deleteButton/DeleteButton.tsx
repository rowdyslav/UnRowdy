import {useDeleteFriend} from "@/features/friends/lib/useDeleteFriend.ts";

const AcceptButton = ({id}: {id :string}) => {
  const {deleteFriend} = useDeleteFriend()

  const handleAccept = async (id:string) => {
    await deleteFriend(id)
  }
  return (
    <button
      className='button-blue bg-yellow-300'
      onClick={() => handleAccept(id)}
    >
      Удалить
    </button>
  );
};

export default AcceptButton;