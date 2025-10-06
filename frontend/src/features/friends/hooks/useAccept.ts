import { friendsApi } from '@/shared/api/friends.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UserType } from '@/shared/types/userType.ts'
import { queryKeys } from '@/features/friends/types/queryKeys.ts'

export const useAccept = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async id => {
      await friendsApi.addFriend(id)
    },

    onSuccess: (_, username) => {
      queryClient.setQueryData<UserType[]>(queryKeys.request, old =>
        old ? old.filter(user => user.id !== username) : [],
      )

      void queryClient.invalidateQueries({ queryKey: queryKeys.myActive })
      void queryClient.invalidateQueries({ queryKey: queryKeys.sent })
    },

    onError: err => {
      console.error('Ошибка при отправке запроса в друзья:', err)
    },
  })
}
