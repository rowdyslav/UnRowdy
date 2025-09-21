import {useForm} from "react-hook-form";
import {useSendFriends} from "@/features/friends/lib/useSendFriends.ts";

const AddFriendForm = () => {
  const { register, handleSubmit, reset } = useForm<{id: string}>();
  const {mutate: addFriend, isSuccess, isError, reset: resetError} = useSendFriends()

  const onSubmit = async (data: {id: string}) => {
    try {
    addFriend(data.id)
    reset()
    } catch (e) {
      console.log(e)
    }
  }

  let placeholder: string = "Введите id друга"

  if (isSuccess) placeholder = `Запрос отправлен!`;
  else if (isError) placeholder = "Ошибка! Попробуйте снова";

  return (
    <div
      className='w-full h-20 px-4 card-element'
    >
      <form
        className='items-center flex justify-between h-full gap-x-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('id', {required: 'Введите id'})}
          className='auth-form h-12' type="text"
          placeholder={placeholder}
          onFocus={() => resetError()}
        />
        <button className='button-blue h-12 p-2 min-w-fit' type="submit">
          Добавить в друзья
        </button>
      </form>
    </div>
  );
};

export default AddFriendForm;