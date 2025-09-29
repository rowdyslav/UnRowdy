import {useQuery} from "@tanstack/react-query";
import type {ServiceType} from "@/shared/types/serviceType.ts";
import {service} from "@/shared/api/service.ts";

export const useMyServices = (id: string) => {
  return useQuery<ServiceType[]>({
    queryKey: ['services', id],

    queryFn: async () => {
      const response = await service.getServices(id)
      return response.data
    }
  })
}