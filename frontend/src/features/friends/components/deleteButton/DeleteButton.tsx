import {useDeleteFriend} from "@/features/friends/lib/useDeleteFriend.ts";

const AcceptButton = ({id}: {id :string}) => {
  const { mutate: deleteFriend } = useDeleteFriend();

  return (
    <button
      className='button-blue bg-yellow-300'
      onClick={() => deleteFriend(id)}
    >
      Удалить
    </button>
  );
};

export default AcceptButton;