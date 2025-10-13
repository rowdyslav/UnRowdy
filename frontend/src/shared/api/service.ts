import { api } from '@/shared/api/axios.ts'
import type { ServiceApiGetType, ServiceTypes } from '@/shared/types/serviceTypes.ts'

export const serviceApi = {
  myServices: () => api.get<ServiceApiGetType[]>('/users/me/services/'),

  servicesByUserId: (userId: string) => api.get<ServiceApiGetType[]>(`/users/${userId}/services`),

  servicesById: (serviceId: string) => api.get<ServiceApiGetType>(`/services/${serviceId}`),

  getAllServices: () => api.get<ServiceApiGetType[]>('/services'),

  addService: (data: ServiceTypes) => api.post<void>('/users/me/services', { ...data }),
}
