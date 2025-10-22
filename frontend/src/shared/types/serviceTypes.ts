import type { UserType } from '@/shared/types/userType.ts'

export type ServiceTypes = {
  name: string
  description: string | null
  price: number
  image_b64: string
  category: { name: string }
  id?: string
}

export type ServiceApiPostType = {
  name: string
  description?: string
  price: number
  image_b64: string
  category_id: string
}

export type ServiceApiGetType = ServiceTypes & { user: UserType }
