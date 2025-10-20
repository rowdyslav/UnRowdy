import { useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceApi } from '@/shared/api/service.ts'
import type { ServiceApiPostType } from '@/shared/types/serviceTypes.ts'
import { queryKeys } from '@/features/service/types/queryKeys.ts'
import { useNotificationStore } from '@/app/providers/Notification/NotificationStore.ts'
import { useNavigate } from 'react-router-dom'

export const useAddService = () => {
  const queryClient = useQueryClient()
  const showSuccess = useNotificationStore(state => state.showSuccess)
  const navigate = useNavigate()

  return useMutation<void, Error, ServiceApiPostType>({
    mutationFn: async data => {
      await serviceApi.addService(data)
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.services })
      navigate(-1)
      showSuccess('Услуга успешно создана')
    },

    onError: err => {
      console.error('Error create new service:', err)
    },
  })
}
