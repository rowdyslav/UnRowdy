import type {ServiceApiGetType} from '@/shared/types/serviceTypes.ts'
import {serviceApi} from '@/shared/api/service.ts'
import {useQuery} from '@tanstack/react-query'
import type {FilterServiceType} from "@/shared/types/filterServiceType.ts";

export const useAllServices = ({category_name}: FilterServiceType) => {
  return useQuery<ServiceApiGetType[]>({
    queryKey: ['services', 'all', category_name],

    queryFn: async () => {
      const response = await serviceApi.getAllServices(category_name)
      return response.data
    },
    staleTime: 0
  })
}
