import type { ErrorResponseType } from '@/shared/types/errorResponseType.ts'
import { getDataByUsername } from '@/shared/lib/getDataByUsername.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/config/queryKeys.ts'
import { friendsApi } from '@/shared/api/friends.ts'
import type { AxiosError } from 'axios'
import { useNotificationStore } from '@/app/providers/notification/NotificationStore.ts'

export const useAddFriend = () => {
  const queryClient = useQueryClient()
  const showError = useNotificationStore(state => state.showError)
  const showSuccess = useNotificationStore(state => state.showSuccess)

  return useMutation<void, AxiosError<ErrorResponseType> | Error, string>({
    mutationFn: async username => {
      const user = await getDataByUsername(username)
      if (!user) {
        throw new Error('USER_NOT_FOUND')
      }

      await friendsApi.addFriend(user.id)
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.sent })
      showSuccess('Заявка успешно отправлена!')
    },

    onError: error => {
      if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
        showError('Пользователь не найден')
        return
      }

      if ('status' in error && error.status === 409) {
        showError('Заявка уже отправлена или пользователь ваш друг')
        return
      }

      showError('Ошибка отправки запроса')
    },
  })
}
