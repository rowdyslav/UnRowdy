import { friendsApi } from '@/shared/api/friends.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDataByUsername } from '@/shared/lib/getDataByUsername.ts'
import { queryKeys } from '@/features/friends/model/queryKeys.ts'

export const useAdd = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async username => {
      const user = await getDataByUsername(username)

      if (user) {
        await friendsApi.addFriend(user.id)
      }
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.sent })
    },

    onError: err => {
      console.error('Ошибка при отправке запроса в друзья:', err)
    },
  })
}
