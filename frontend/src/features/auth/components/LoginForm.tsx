import type { LoginFormType } from '@/features/auth/types/LoginForm.schema.ts'
import { LoginFormSchema } from '@/features/auth/types/LoginForm.schema.ts'
import { useLogin } from '@/features/auth/hooks/useLogin.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Field from '@/shared/components/Field.tsx'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(LoginFormSchema) })

  const { mutateAsync: login, isPending, error, reset } = useLogin()

  const onSubmit = async (data: LoginFormType) => {
    await login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-7 justify-stretch'>
      <div>
        <Field error={errors?.email?.message}>
          <input
            className='input'
            {...register('email')}
            placeholder='Email'
            autoComplete='email'
            onInput={reset}
          />
        </Field>
      </div>

      <div>
        <Field error={errors?.password?.message || error || null}>
          <input
            {...register('password', { required: 'Введите пароль' })}
            className='input'
            placeholder='Password'
            type='password'
            autoComplete='current-password'
            onInput={reset}
          />
        </Field>
      </div>

      <button type='submit' className='button-blue'>
        {isPending ? 'Вход...' : 'Войти'}
      </button>
    </form>
  )
}

export default LoginForm
