import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {
   LoginFormType
} from "@/features/auth/components/LoginForm/types/LoginForm.schema.ts";
import {LoginFormSchema} from "@/features/auth/components/LoginForm/types/LoginForm.schema.ts"
import {useLogin} from "@/features/auth/components/LoginForm/useLogin.ts";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema)
  })

  const {authLogin, error, setError} = useLogin()

  const onSubmit = async (data: LoginFormType) => {
    await authLogin(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-7 justify-stretch'
    >

      <div>
        <input
          className='auth-form'
          {...register("email")}
          placeholder="Email" autoComplete="email"
          onInput={() => setError(null)}
        />
        {errors.email && <p>{errors.email.message}</p>} {/*ошибка валидации*/}
      </div>

      <div>
        <input
          className='auth-form'
          {...register("password", {required: "Введите пароль"})}
          placeholder="Password"
          type="password" autoComplete="current-password"
          onInput ={() => setError(null)}
        />

        <p className='text-red-500'>{error}</p> {/*ошибка с бека*/}
        {errors.password && <p>{errors.password.message}</p>} {/*ошибка валидации*/}
      </div>

      <button type="submit" className='button-blue '>Войти</button>
    </form>
  )
}

export default LoginForm