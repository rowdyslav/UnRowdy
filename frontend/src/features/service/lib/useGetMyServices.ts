import {useQuery} from "@tanstack/react-query";
import type {ServiceType} from "@/shared/types/serviceType.ts";
import {serviceApi} from "@/shared/api/serviceApi.ts";

export const useGetMyServices = () => {
  return useQuery<ServiceType[]>({
    queryKey: ['services'],

    queryFn: async () => {
      const response = await serviceApi.getServices()
      return response.data
    }
  })
}