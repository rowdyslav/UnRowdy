import { useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceApi } from '@/shared/api/serviceApi.ts'
import type { ServiceType } from '@/shared/types/serviceType.ts'
import { useNavigate } from 'react-router-dom'
import { queryKeys } from '@/features/service/types/queryKeys.ts'

export const useAdd = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<void, Error, ServiceType>({
    mutationFn: async data => {
      await serviceApi.addService(data)
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.services })
      navigate(-1)
    },
  })
}
