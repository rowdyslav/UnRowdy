import { api } from '@/shared/api/axios.ts'
import type {ServiceApiType, ServiceType} from '@/shared/types/serviceType.ts'

export const serviceApi = {
  myServices: () => api.get<ServiceApiType[]>('/users/me/services/'),

  servicesByUserId: (userId: string) => api.get<ServiceApiType[]>(`/users/${userId}/services`),

  servicesById: (serviceId: string) => api.get<ServiceApiType>(`/services/${serviceId}`),

  getAllServices: () => api.get<ServiceApiType[]>('/services?limit=10&offset=0'),

  addService: (data: ServiceType) => {
    return api.post<void>('/users/me/services', {
      name: data.name,
      description: data.description,
      price: data.price,
      image_b64: data.image_b64,
    })
  },
}
