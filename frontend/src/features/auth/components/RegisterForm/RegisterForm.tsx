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
} from "@/features/auth/lib/useRegister.ts";

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
    await registration(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-7 justify-stretch'
      autoComplete="on"
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
          {...register("email")}
          className='auth-form'
          placeholder="Email"
          autoComplete="email"
          onInput={() => setError(null)}
        />
        {errors.email && <p>{errors.email.message}</p>} {/*ошибка валидации*/}
        <p className='text-red-500'>{error}</p> {/*ошибка с бека*/}
      </div>

      <div>
        <input
          className='auth-form'
          {...register("password", {required: "Введите пароль"})}
          placeholder="Password"
          type="password" autoComplete="new-password"
        />
        {errors.password && <p>{errors.password.message}</p>} {/*ошибка валидации*/}
      </div>


      <button type="submit" className='button-blue'>Зарегистрироваться</button>
    </form>
  )
}

export default RegisterForm