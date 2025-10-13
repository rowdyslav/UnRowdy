import { friendsApi } from '@/shared/api/friends.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDataByUsername } from '@/shared/lib/getDataByUsername.ts'
import { queryKeys } from '@/features/friends/types/queryKeys.ts'
import { useNotification } from '@/shared/hooks/useNotification.ts'
import type { AxiosError } from 'axios'
import type { ErrorResponseType } from '@/shared/types/errorResponseType.ts'

export const useAdd = () => {
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()

  return useMutation<void, unknown, string>({
    mutationFn: async username => {
      const user = await getDataByUsername(username)
      if (!user) throw new Error()

      await friendsApi.addFriend(user.id)
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.sent })
      showSuccess('Заявка успешно отправлена!')
    },

    onError: err => {
      const error = err as AxiosError<ErrorResponseType>

      if (error.status === 409) {
        showError('Заявка уже отправлена или пользователь ваш друг')
      } else {
        showError('Пользователь не найден')
      }
    },
  })
}
