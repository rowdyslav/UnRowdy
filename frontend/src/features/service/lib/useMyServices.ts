import {useQuery} from "@tanstack/react-query";
import type {ServiceType} from "@/shared/types/serviceType.ts";
import {service} from "@/shared/api/service.ts";

export const useMyServices = () => {
  return useQuery<ServiceType[]>({
    queryKey: ['services'],

    queryFn: async () => {
      const response = await service.getServices()
      return response.data
    }
  })
}