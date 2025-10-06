import { useQuery } from '@tanstack/react-query'
import { friendsApi } from '@/shared/api/friends'
import type { UserType } from '@/shared/types/userType'
import { queryKeys } from '@/features/friends/types/queryKeys.ts'

export const useRequestIn = () => {
  return useQuery<UserType[]>({
    queryKey: queryKeys.request,

    queryFn: async () => {
      const response = await friendsApi.getMyFriends('received')
      return response.data
    },
  })
}
