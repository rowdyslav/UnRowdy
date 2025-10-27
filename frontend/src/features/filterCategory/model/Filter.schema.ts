import { z } from 'zod'

export const FilterSchema = z.object({
  keywords: z.string().nullable(),
  min_price: z.string().nullable(),
  max_price: z.string().nullable(),
})

export type FilterQueryTypes = z.infer<typeof FilterSchema>
