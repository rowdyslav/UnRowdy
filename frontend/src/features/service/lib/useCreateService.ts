import {useMutation, useQueryClient} from "@tanstack/react-query";
import {serviceApi} from "@/shared/api/serviceApi.ts";
import type {ServiceType} from "@/shared/types/serviceType.ts";

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ServiceType>({
    mutationFn: async (data) => {
      await serviceApi.addService(data)
    },

    onSuccess: () =>
      void queryClient.invalidateQueries({queryKey: ['services']}),
  })
}