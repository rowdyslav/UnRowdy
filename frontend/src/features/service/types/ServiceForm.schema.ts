import {z} from "zod";

export const ServiceFormSchema = z.object({
  name: z.string().min(5, {message: "Минимум 5 символов"}),
  price: z.number("Укажите цену"),
  image: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: "Выберите изображение",
    })
})

export type ServiceFormType = z.infer<typeof ServiceFormSchema>;