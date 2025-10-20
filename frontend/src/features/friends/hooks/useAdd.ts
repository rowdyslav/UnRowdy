import type { ErrorResponseType } from '@/shared/types/errorResponseType.ts'
import { getDataByUsername } from '@/shared/lib/getDataByUsername.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/types/queryKeys.ts'
import { friendsApi } from '@/shared/api/friends.ts'
import type { AxiosError } from 'axios'

export const useAdd = () => {
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError<ErrorResponseType>, string>({
    mutationFn: async username => {
      const user = await getDataByUsername(username)
      if (!user) throw new Error()

      await friendsApi.addFriend(user.id)
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.sent })
    },
  })
}
