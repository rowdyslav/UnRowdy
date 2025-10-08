import { api } from '@/shared/api/axios.ts'
import type { ServiceType } from '@/shared/types/serviceType.ts'

export const serviceApi = {
  myServices: () => api.get<ServiceType[]>('/users/me/services/'),

  servicesByUserId: (userId: string) => api.get<ServiceType[]>(`/users/${userId}/services`),

  servicesById: (serviceId: string) => api.get<ServiceType>(`/services/${serviceId}`),

  getAllServices: () => api.get<ServiceType[]>('/services?limit=10&offset=0'),

  addService: (data: ServiceType) => {
    return api.post<void>('/users/me/services', {
      name: data.name,
      description: data.description,
      price: data.price,
      image_b64: data.image_b64,
    })
  },
}
