import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().min(1, { message: 'Поле email обязательно' }).email({ message: 'Некорректный email' }),
  password: z.string().nonempty('Введите пароль').min(8, 'Минимальное кол-во символов: 8'),
})

export type LoginFormType = z.infer<typeof LoginFormSchema>
