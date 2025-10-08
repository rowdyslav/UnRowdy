import { z } from 'zod'

export const ServiceFormSchema = z.object({
  name: z.string().min(5, { message: 'Минимум 5 символов' }),
  description: z.union([z.string(), z.null()]),
  price: z.number('Укажите цену'),
  image: z.union([
    z.custom<FileList>(val => val instanceof FileList && val.length > 0, { message: 'Выберите изображение' }),
    z.string(),
  ]),
})

export type ServiceFormType = z.infer<typeof ServiceFormSchema>
