import { useQuery } from '@tanstack/react-query'
import { serviceApi } from '@/shared/api/service/serviceApi.ts'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import { queryKeys } from '@/entities/service/config/queryKeys.ts'

import type { ServiceApiGetType } from '@/shared/api/service/types.ts'

export const useServices = () => {
  const profile = useProfileStore(state => state.profile)
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return useQuery<ServiceApiGetType[], Error>({
    queryKey: [...queryKeys.services, profile?.id],
    queryFn: async () => {
      if (isMyProfile) {
        const response = await serviceApi.my()
        return response.data
      }

      if (!profile?.id) {
        throw new Error('Не удалось получить id пользователя')
      }

      const response = await serviceApi.byUserId(profile.id)
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 20,
  })
}
