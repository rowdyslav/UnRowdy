import { z } from "zod";

export const LoginFormSchema = z.object({
  password: z.string().nonempty("Введите пароль").min(8, 'Минимальное кол-во символов: 8'),
  email: z.string().min(1, { message: "Поле email обязательно" }).email({ message: "Некорректный email" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>