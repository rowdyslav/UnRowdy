import { useAdd } from '@/features/friends/hooks/useAdd.ts'
import { useForm } from 'react-hook-form'

const Add = () => {
  const { register, handleSubmit, reset } = useForm<{ username: string }>()
  const { mutate: addFriend, isSuccess, isError, reset: resetError } = useAdd()

  const onSubmit = async (data: { username: string }) => {
    try {
      addFriend(data.username)
      reset()
    } catch (e) {
      console.log(e)
    }
  }

  let placeholder = 'Добавить в друзья'
  if (isSuccess) placeholder = `Запрос отправлен!`
  else if (isError) placeholder = 'Ошибка! Попробуйте снова'

  return (
    <div className='w-full h-20 px-4 card-element'>
      <form className='items-center flex justify-between h-full gap-x-6' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('username', { required: 'Введите id' })}
          className='input h-12'
          type='text'
          placeholder={'Введите имя'}
          onFocus={resetError}
        />

        <button className='button-blue h-12 p-2 w-xs min-w-fit' type='submit'>
          {placeholder}
        </button>
      </form>
    </div>
  )
}

export default Add
