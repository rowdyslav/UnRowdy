import { useAddFriend } from '@/features/friends/api/useAddFriend.ts'
import { useForm } from 'react-hook-form'

const AddFriend = () => {
  const { register, handleSubmit, reset } = useForm<{ username: string }>()
  const { mutate: addFriend, reset: resetError } = useAddFriend()

  const onSubmit = async (data: { username: string }) => {
    try {
      addFriend(data.username)
      reset()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='w-full h-20 px-4 card-element'>
      <form
        className='items-center flex justify-between h-full gap-x-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('username', { required: 'Введите id' })}
          className='input h-12'
          type='text'
          placeholder={'Введите имя'}
          onFocus={resetError}
        />

        <button className='button-blue h-12 p-2 w-xs min-w-fit' type='submit'>
          Добавить в друзья
        </button>
      </form>
    </div>
  )
}

export default AddFriend
