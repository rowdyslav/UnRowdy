import type { ServiceApiGetType } from '@/shared/types/serviceTypes.ts'
import { serviceApi } from '@/shared/api/service.ts'
import { useQuery } from '@tanstack/react-query'
import type { FilterQueryTypes } from '@/features/categories/types/Filter.schema.ts'

export const useAllServices = (data: FilterQueryTypes & { category?: string }) => {
  return useQuery<ServiceApiGetType[]>({
    queryKey: ['services', 'all', data.category, data.keywords],

    queryFn: async () => {
      const response = await serviceApi.getAllServices({ ...data })
      return response.data
    },
  })
}
