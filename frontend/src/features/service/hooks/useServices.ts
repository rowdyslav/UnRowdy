import { useQuery } from '@tanstack/react-query'
import type { ServiceType } from '@/shared/types/serviceType.ts'
import { serviceApi } from '@/shared/api/serviceApi.ts'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import { queryKeys } from '@/features/service/types/queryKeys.ts'

export const useServices = () => {
  const profile = useProfileStore(state => state.profile)
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return useQuery<ServiceType[], Error>({
    queryKey: [...queryKeys.services, profile?.id],
    queryFn: async () => {
      if (isMyProfile) {
        const response = await serviceApi.getMyServices()
        return response.data
      }

      if (!profile?.id) {
        throw new Error('Не удалось получить id пользователя')
      }

      const response = await serviceApi.getServices(profile.id)
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })
}
