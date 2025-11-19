import type {UserType} from "@/share/types/userType.ts";

export interface ServiceType {
  name: string
  description: string | null
  price: number
  image_b64: string
  category: { name: string }
  id: string
  user: UserType
}

