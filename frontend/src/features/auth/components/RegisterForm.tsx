import {useForm} from "react-hook-form";
import type {
  RegisterFormType
} from "@/features/auth/types/RegisterForm.schema.ts";
import {
  RegisterFormSchema
} from "@/features/auth/types/RegisterForm.schema.ts";
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

  const {mutateAsync: registration, isPending, error, reset} = useRegister();

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await registration(data);
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-7 justify-stretch'
      autoComplete="on"
    >

      {/*USERNAME*/}
      <div>
        <input
          className='input'
          {...register("username")}
          placeholder="Username" autoComplete="given-name"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      {/*EMAIL*/}
      <div>
        <input
          {...register("email")}
          className='input'
          placeholder="Email"
          autoComplete="email"
          onInput={reset}
        />
        {errors.email && <p>{errors.email.message}</p>} {/*ошибка валидации*/}
        {error && <p className="text-red-500">{error}</p>} {/*ошибка с бека*/}
      </div>

      {/*PASSWORD*/}
      <div>
        <input
          className='input'
          {...register("password", {required: "Введите пароль"})}
          placeholder="Password"
          type="password" autoComplete="new-password"
          onInput={reset}
        />
        {errors.password &&
          <p>{errors.password.message}</p>} {/*ошибка валидации*/}
      </div>

      <button
        type="submit" className='button-blue'
      >{isPending ? "Регистрация..." : "Зарегистрироваться"}</button>
    </form>
  )
}

export default RegisterForm