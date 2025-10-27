import type { UserType } from '@/shared/types/userType.ts'
import { friendsApi } from '@/shared/api/friends.ts'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/config/queryKeys.ts'

const useRequests = (type: 'sent' | 'received') => {
  return useQuery<UserType[]>({
    queryKey: type === 'sent' ? queryKeys.sent : queryKeys.received,

    queryFn: async () => {
      const response = await friendsApi.getMyFriends(type)
      return response.data
    },
  })
}

export default useRequests
