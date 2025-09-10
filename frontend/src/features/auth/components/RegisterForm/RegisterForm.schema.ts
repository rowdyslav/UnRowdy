import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().min(1, { message: "Поле email обязательно" }).email({ message: "Некорректный email" }),
  password: z.string().nonempty("Введите пароль").min(8, 'Минимальное кол-во символов: 8'),
  username: z.string().nonempty("Введите Имя").min(2, 'Минимальное кол-во символов: 2')
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>