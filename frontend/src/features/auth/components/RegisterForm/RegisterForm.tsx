import {useForm} from "react-hook-form";
import type {
  RegisterFormType
} from "@/features/auth/components/RegisterForm/types/RegisterForm.schema.ts";
import {
  RegisterFormSchema
} from "@/features/auth/components/RegisterForm/types/RegisterForm.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  useRegister
} from "@/features/auth/components/RegisterForm/useRegister.ts";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema)
  })

  const {registration, error, setError} = useRegister()

  const onSubmit = async (data: RegisterFormType) => {
    const successRegistration: boolean = await registration(data)

    if (!successRegistration) { //если регистрация прошла успешно, автоматически выполняет login
      console.log(error)
    }
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
          onChange={() => setError(null)}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <p className='text-red-500'>{error}</p>

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