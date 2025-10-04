import type { UserType } from '@/shared/types/userType.ts'
import { friendsApi } from '@/shared/api/friends.ts'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/model/queryKeys.ts'

const useRequestsOut = () => {
  return useQuery<UserType[]>({
    queryKey: queryKeys.sent,

    queryFn: async () => {
      const response = await friendsApi.getMyFriends('sent')
      return response.data
    },
  })
}

export default useRequestsOut
