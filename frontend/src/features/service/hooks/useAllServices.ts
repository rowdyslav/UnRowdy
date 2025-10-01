import {useQuery} from "@tanstack/react-query";
import type {ServiceType} from "@/shared/types/serviceType.ts";
import {serviceApi} from "@/shared/api/serviceApi.ts";

export const useAllServices = () => {
  return useQuery<ServiceType[]>({
    queryKey: ['services', 'all'],

    queryFn: async () => {
      const response = await serviceApi.getAllServices()
      return response.data
    }
  })
}