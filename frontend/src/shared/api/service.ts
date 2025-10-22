import { api } from '@/shared/api/axios.ts'
import type { ServiceApiGetType, ServiceApiPostType } from '@/shared/types/serviceTypes.ts'
import type { FilterQueryTypes } from '@/features/categories/types/Filter.schema.ts'

export const serviceApi = {
  myServices: () => api.get<ServiceApiGetType[]>('/users/me/services/'),

  servicesByUserId: (userId: string) => api.get<ServiceApiGetType[]>(`/users/${userId}/services`),

  servicesById: (serviceId: string) => api.get<ServiceApiGetType>(`/services/${serviceId}`),

  getAllServices: (data: FilterQueryTypes & { category_name?: string }) => {
    const { category_name, keywords, max_price, min_price } = data

    return api.get<ServiceApiGetType[]>('/services', {
      params: {
        ...(category_name && { category_name }),
        ...(keywords && { keywords }),
        ...(max_price && { max_price }),
        ...(min_price && { min_price }),
      },
    })
  },

  addService: (data: ServiceApiPostType) => api.post<void>('/users/me/services', { ...data }),
}
