import type { LoginFormType } from '@/features/auth/types/LoginForm.schema.ts'
import { LoginFormSchema } from '@/features/auth/types/LoginForm.schema.ts'
import { useLogin } from '@/features/auth/hooks/useLogin.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(LoginFormSchema) })

  const { mutateAsync: login, isPending, error, reset } = useLogin()

  const onSubmit = async (data: LoginFormType) => {
    try {
      await login(data)
    } catch {
      /* empty */
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-7 justify-stretch'>
      <div>
        <input className='input' {...register('email')} placeholder='Email' autoComplete='email' onInput={reset} />
        <p>{errors?.email?.message}</p>
        {/*ошибка валидации*/}
      </div>

      <div>
        <input
          {...register('password', { required: 'Введите пароль' })}
          className='input'
          placeholder='Password'
          type='password'
          autoComplete='current-password'
          onInput={reset}
        />
        {/*ошибка с бека*/}
        <p className='text-red-500'>{error}</p>
        {/*ошибка валидации*/}
        <p>{errors?.password?.message}</p>
      </div>

      <button type='submit' className='button-blue'>
        {isPending ? 'Вход...' : 'Войти'}
      </button>
    </form>
  )
}

export default LoginForm
