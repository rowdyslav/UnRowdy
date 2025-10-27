import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/entities/service/config/queryKeys.ts'
import { useNotificationStore } from '@/app/providers/Notification/NotificationStore.ts'
import { useNavigate } from 'react-router-dom'
import { serviceApi } from '@/shared/api/service/serviceApi.ts'
import type { ServiceApiPostType } from '@/shared/api/service/types.ts'

export const useAddService = () => {
  const queryClient = useQueryClient()
  const showSuccess = useNotificationStore(state => state.showSuccess)
  const navigate = useNavigate()

  return useMutation<void, Error, ServiceApiPostType>({
    mutationFn: async data => {
      await serviceApi.add(data)
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
