import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {
   LoginFormType
} from "@/features/auth/components/LoginForm/LoginForm.schema.ts";
import {LoginFormSchema} from "@/features/auth/components/LoginForm/LoginForm.schema.ts"

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema)
  })

  const onSubmit = (data: LoginFormType) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-7 justify-stretch'
    >

      <div>
        <input
          className='auth-form'
          {...register("username")}
          placeholder="Name" autoComplete="given-name"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <input
          className='auth-form'
          {...register("password", {required: "Введите пароль"})}
          placeholder="Password"
          type="password" autoComplete="current-password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" className='button-form'>Войти</button>
    </form>
  )
}

export default LoginForm