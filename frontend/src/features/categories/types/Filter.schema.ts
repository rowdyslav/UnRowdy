import { z } from 'zod'

export const FilterSchema = z.object({
  keywords: z.string().optional().nullable(),
  min_price: z.string().optional().nullable(),
  max_price: z.string().optional().nullable(),
})

export type FilterQueryTypes = z.infer<typeof FilterSchema>
