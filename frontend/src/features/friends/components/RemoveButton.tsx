import {useRemove} from "@/features/friends/hooks/useRemove.ts";

const AcceptButton = ({id}: { id: string }) => {
  const {mutate: deleteFriend} = useRemove();

  return (
    <button
      className='button h-10 flex items-center'
      onClick={() => deleteFriend(id)}
    >
      Удалить
    </button>
  );
};

export default AcceptButton;