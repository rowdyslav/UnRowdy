import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/entities/service/config/queryKeys.ts'
import { useNotificationStore } from '@/shared/model/notification/notificationStore.ts'
import { useNavigate } from 'react-router-dom'
import { serviceApi } from '@/shared/api/service/serviceApi.ts'
import type { ServiceApiPostType } from '@/shared/api/service/types.ts'

export const useAddService = () => {
  const queryClient = useQueryClient()
  const showSuccess = useNotificationStore(state => state.showSuccess)
  const showError = useNotificationStore(state => state.showError)
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

    onError: () => {
      showError('Не удалось создать услугу')
    },
  })
}
