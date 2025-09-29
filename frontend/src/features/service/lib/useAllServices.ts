import {useQuery} from "@tanstack/react-query";
import type {ServiceType} from "@/shared/types/serviceType.ts";
import {service} from "@/shared/api/service.ts";

export const useAllServices = () => {
  return useQuery<ServiceType[]>({
    queryKey: ['services', 'all'],

    queryFn: async () => {
      const response = await service.getAllServices()
      return response.data
    }
  })
}