import type { UserType } from '@/shared/types/userType.ts'
import { friendsApi } from '@/shared/api/friends.ts'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/types/queryKeys.ts'

const useRequests = (type: 'sent' | 'received') => {
  return useQuery<UserType[]>({
    queryKey: type === 'sent' ? queryKeys.sent : queryKeys.received,

    queryFn: async () => {
      const response = await friendsApi.getMyFriends(type)
      return response.data
    },
    staleTime: 1000 * 60 * 3,
  })
}

export default useRequests
