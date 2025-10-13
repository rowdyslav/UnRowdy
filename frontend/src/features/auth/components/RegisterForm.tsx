import type { RegisterFormType } from '@/features/auth/types/RegisterForm.schema.ts'
import { RegisterFormSchema } from '@/features/auth/types/RegisterForm.schema.ts'
import { useRegister } from '@/features/auth/hooks/useRegister.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({ resolver: zodResolver(RegisterFormSchema) })

  const { mutateAsync: registration, isPending, error, reset } = useRegister()

  const onSubmit = async (data: RegisterFormType) => {
    await registration(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-7 justify-stretch'
      autoComplete='on'
    >
      {/*USERNAME*/}
      <div>
        <input
          className='input'
          {...register('username')}
          placeholder='Username'
          autoComplete='given-name'
        />
        {/*ошибка валидации*/}
        <p className='text-red-500'>{errors?.username?.message}</p>
      </div>

      {/*EMAIL*/}
      <div>
        <input
          {...register('email')}
          className='input'
          placeholder='Email'
          autoComplete='email'
          onInput={reset}
        />
        {/*ошибка валидации*/}
        <p className='text-red-500'>{errors?.email?.message}</p>
        {/*ошибка с бека*/}
        <p className='text-red-500'>{error}</p>
      </div>

      {/*PASSWORD*/}
      <div>
        <input
          className='input'
          {...register('password', { required: 'Введите пароль' })}
          placeholder='Password'
          type='password'
          autoComplete='new-password'
          onInput={reset}
        />
        {/*ошибка валидации*/}
        <p className='text-red-500'>{errors?.password?.message}</p>
      </div>

      <button type='submit' className='button-blue'>
        {isPending ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}

export default RegisterForm
