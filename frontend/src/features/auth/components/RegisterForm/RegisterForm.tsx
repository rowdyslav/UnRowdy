import {useForm} from "react-hook-form";
import type {
  RegisterFormType
} from "@/features/auth/components/RegisterForm/RegisterForm.schema";
import {
  RegisterFormSchema
} from "@/features/auth/components/RegisterForm/RegisterForm.schema";
import {zodResolver} from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema)
  })

  const onSubmit = (data: RegisterFormType) => {
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
          placeholder="Username" autoComplete="given-name"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <input
          className='auth-form'
          {...register("email")}
          placeholder="Email" autoComplete="email"
        />
        {errors.email && <p>{errors.email.message}</p>}
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

      <button type="submit" className='button-form'>Зарегистрироваться</button>
    </form>
  )
}

export default RegisterForm