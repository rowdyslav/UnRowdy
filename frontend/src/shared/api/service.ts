import {api} from '@/shared/api/axios.ts'
import type {ServiceApiGetType, ServiceApiPostType} from '@/shared/types/serviceTypes.ts'

export const serviceApi = {
  myServices: () => api.get<ServiceApiGetType[]>('/users/me/services/'),

  servicesByUserId: (userId: string) => api.get<ServiceApiGetType[]>(`/users/${userId}/services`),

  servicesById: (serviceId: string) => api.get<ServiceApiGetType>(`/services/${serviceId}`),

  getAllServices: (category?: string) => api.get<ServiceApiGetType[]>(`/services?category_name=${category}`),

  addService: (data: ServiceApiPostType) => api.post<void>('/users/me/services', {...data}),
}
