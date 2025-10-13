import type { UserType } from '@/shared/types/userType.ts'

export type ServiceTypes = {
  name: string
  description: string | null
  price: number
  image_b64: string
  id?: string
}

export type ServiceApiPostType = Omit<ServiceTypes, 'id'> & {
  category?: string
  subcategory?: string
}

export type ServiceApiGetType = ServiceTypes & { user: UserType }
