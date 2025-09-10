import { z } from "zod";

export const LoginFormSchema = z.object({
  password: z.string().nonempty("Введите пароль").min(8, 'Минимальное кол-во символов: 8'),
  username: z.string().nonempty("Введите Имя").min(2, 'Минимальное кол-во символов: 2')
});

export type LoginFormType = z.infer<typeof LoginFormSchema>