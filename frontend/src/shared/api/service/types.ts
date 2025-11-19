import type { UserType } from '@/shared/types/userType.ts'

export interface ServiceApiPostType {
  name: string
  description: string | null
  price: number
  image_b64: string
  category_id: string
}

export interface ServiceApiGetType {
  name: string
  description: string | null
  price: number
  image_b64: string
  category: { name: string }
  id: string
  user: UserType
}

export interface FilterTypes {
  keywords?: string | null
  min_price?: string | null
  max_price?: string | null
}
