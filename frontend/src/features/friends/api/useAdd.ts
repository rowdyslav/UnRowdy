import type { ErrorResponseType } from '@/shared/types/errorResponseType.ts'
import { getDataByUsername } from '@/shared/lib/getDataByUsername.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/config/queryKeys.ts'
import { friendsApi } from '@/shared/api/friends.ts'
import type { AxiosError } from 'axios'
import { useNotificationStore } from '@/app/providers/Notification/NotificationStore.ts'

export const useAdd = () => {
  const queryClient = useQueryClient()
  const showError = useNotificationStore(state => state.showError)
  const showSuccess = useNotificationStore(state => state.showSuccess)

  return useMutation<void, AxiosError<ErrorResponseType>, string>({
    mutationFn: async username => {
      const user = await getDataByUsername(username)
      if (!user) throw new Error()

      await friendsApi.addFriend(user.id)
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.sent })
      showSuccess('Заявка успешно отправлена!')
    },

    onError: error => {
      if (error.status === 409) showError('Заявка уже отправлена или пользователь ваш друг')
      else showError('Ошибка отправки запроса')
    },
  })
}
