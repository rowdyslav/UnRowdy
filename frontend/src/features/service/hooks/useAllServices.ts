import type { ServiceApiGetType } from '@/shared/types/serviceTypes.ts'
import { serviceApi } from '@/shared/api/service.ts'
import { useQuery } from '@tanstack/react-query'

export const useAllServices = () => {
  return useQuery<ServiceApiGetType[]>({
    queryKey: ['services', 'all'],

    queryFn: async () => {
      const response = await serviceApi.getAllServices()
      return response.data
    },
  })
}
