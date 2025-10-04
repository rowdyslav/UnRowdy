import type { UserType } from '@/shared/types/userType'
import { friendsApi } from '@/shared/api/friends'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/model/queryKeys.ts'

export const useFriends = (id: string) => {
  return useQuery<UserType[]>({
    queryKey: [...queryKeys.myActive, id],

    // если передан id, получаем друзей по нему, в ином случае получаем своих друзей
    queryFn: async () => {
      const response = await (id ? friendsApi.getFriends('active', id) : friendsApi.getMyFriends('active'))

      return response.data
    },
  })
}
