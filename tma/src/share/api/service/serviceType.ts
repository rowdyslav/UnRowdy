import type {UserType} from "@/share/types/userType.ts";

export interface FilterTypes {
  keywords?: string | null
  min_price?: string | null
  max_price?: string | null
}

export interface ServiceType {
  name: string
  description: string | null
  price: number
  image_b64: string
  category: { name: string }
  id: string
  user: UserType
  tg_username: string
}