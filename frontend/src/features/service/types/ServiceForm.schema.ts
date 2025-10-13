import { z } from 'zod'

export const ServiceFormSchema = z.object({
  name: z.string().min(3, { message: 'Минимум 3 символа' }),
  description: z.union([z.string(), z.null()]),
  category: z.string().min(1, { message: 'Выберите категорию' }),
  subcategory: z.string().min(1, { message: 'Выберите подкатегорию' }),
  image_b64: z.string().nonempty('Загрузите изображение'),
  price: z.number('Укажите цену'),
})

export type ServiceFormType = z.infer<typeof ServiceFormSchema>
