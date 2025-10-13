import { friendsApi } from '@/shared/api/friends.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/types/queryKeys.ts'
import type { UserType } from '@/shared/types/userType.ts'

export const useRemove = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async id => {
      await friendsApi.removeFriend(id)
    },

    onSuccess: (_, id) => {
      console.log(id)
      queryClient.setQueryData<UserType[]>(queryKeys.myActive, old =>
        old ? old.filter(user => user.id !== id) : [],
      )

      void queryClient.invalidateQueries({ queryKey: queryKeys.myActive })
    },

    onError: err => {
      console.error('Ошибка при удалении друга:', err)
    },
  })
}
