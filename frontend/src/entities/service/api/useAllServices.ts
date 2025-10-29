import { useQuery } from '@tanstack/react-query'
import type { ServiceApiGetType } from '@/shared/api/service/types.ts'
import type { FilterQueryTypes } from '@/features/filterCategory/model/types/Filter.schema.ts'
import { serviceApi } from '@/shared/api/service/serviceApi.ts'
import { queryKeys } from '@/entities/service/config/queryKeys.ts'

export const useAllServices = (data: FilterQueryTypes & { category_name?: string }) => {
  return useQuery<{ data: ServiceApiGetType[]; maxPrice: number }>({
    queryKey: [
      queryKeys.allServices,
      data.category_name,
      data.keywords,
      data.min_price,
      data.max_price,
    ],

    queryFn: async () => {
      const response = await serviceApi.all({ ...data })
      const maxPrice: number = Number(response.headers['category-maxprice'])

      return { data: response.data, maxPrice }
    },
  })
}
