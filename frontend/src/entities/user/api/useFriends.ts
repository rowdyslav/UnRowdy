import type { UserType } from '@/shared/types/userType.ts'
import { friendsApi } from '@/shared/api/friends.ts'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/features/friends/config/queryKeys.ts'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'

export const useFriends = () => {
  const profile = useProfileStore(state => state.profile)
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return useQuery<UserType[]>({
    queryKey: [...queryKeys.myActive, profile?.id],
    queryFn: async () => {
      if (isMyProfile) {
        const response = await friendsApi.getMyFriends('active')
        return response.data
      }

      if (!profile?.id) {
        throw new Error('Не удалось получить id пользователя')
      }

      const response = await friendsApi.getFriends('active', profile?.id)
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })
}
