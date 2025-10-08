import type {UserType} from "@/shared/types/userType.ts";

export type ServiceType = {
  name: string
  description?: string
  price: number
  image_b64: string
  id?: string
}

export type ServiceApiType = ServiceType & {user: UserType}


