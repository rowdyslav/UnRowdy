import { useQuery } from '@tanstack/react-query'
import type { ServiceType } from '@/shared/types/serviceType.ts'
import { serviceApi } from '@/shared/api/serviceApi.ts'

export const useServices = (id: string) => {
  return useQuery<ServiceType[]>({
    queryKey: ['services', id],

    // если передан id, получаем услуги по нему, в ином случае получаем свои услуги
    queryFn: async () => {
      const response = await (id ? serviceApi.getServices(id) : serviceApi.getMyServices())
      return response.data
    },
  })
}
