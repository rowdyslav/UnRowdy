import type { FilterQueryTypes } from '@/features/filterCategory/model/types/Filter.schema.ts'
import type { ServiceApiGetType, ServiceApiPostType } from '@/shared/api/service/types.ts'
import { api } from '@/shared/api/axios.ts'

export const serviceApi = {
  my: () => api.get<ServiceApiGetType[]>('/users/me/services/'),

  byUserId: (userId: string) => api.get<ServiceApiGetType[]>(`/users/${userId}/services`),

  byId: (serviceId: string) => api.get<ServiceApiGetType>(`/services/${serviceId}`),

  all: (data: FilterQueryTypes & { category_name?: string }) => {
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

  add: (data: ServiceApiPostType) => api.post<void>('/users/me/services', { ...data }),
}
