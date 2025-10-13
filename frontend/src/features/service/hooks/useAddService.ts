import { useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceApi } from '@/shared/api/service.ts'
import type { ServiceApiPostType } from '@/shared/types/serviceTypes.ts'
import { useNavigate } from 'react-router-dom'
import { queryKeys } from '@/features/service/types/queryKeys.ts'
import { useNotification } from '@/shared/hooks/useNotification.ts'

export const useAddService = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { showSuccess } = useNotification()

  return useMutation<void, Error, ServiceApiPostType>({
    mutationFn: async data => {
      await serviceApi.addService(data)
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.services })
      showSuccess('Услуга успешно создана')
      navigate(-1)
    },

    onError: e => {
      console.log(e)
    },
  })
}
