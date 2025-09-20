import {useForm} from "react-hook-form";
import {useSendFriends} from "@/features/friends/lib/useSendFriends.ts";

const AddFriendForm = () => {
  const { register, handleSubmit } = useForm<{id: string}>();
  const {addFriend} = useSendFriends()

  const onSubmit = async (data: {id: string}) => {
    await addFriend(data.id)
  }

  return (
    <div
      className='w-full h-20 px-4 card-element'
    >
      <form
        className='items-center flex justify-between h-full gap-x-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('id')}
          className='auth-form h-12' type="text"
          placeholder='Введите id друга'
        />
        <button className='button-blue h-12 p-2 min-w-fit' type="submit">
          Добавить в друзья
        </button>
      </form>
    </div>
  );
};

export default AddFriendForm;