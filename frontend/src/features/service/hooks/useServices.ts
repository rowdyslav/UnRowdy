import { useQuery } from '@tanstack/react-query'
import type { ServiceApiGetType } from '@/shared/types/serviceTypes.ts'
import { serviceApi } from '@/shared/api/service.ts'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import { queryKeys } from '@/features/service/types/queryKeys.ts'

export const useServices = () => {
  const profile = useProfileStore(state => state.profile)
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return useQuery<ServiceApiGetType[], Error>({
    queryKey: [...queryKeys.services, profile?.id],
    queryFn: async () => {
      if (isMyProfile) {
        const response = await serviceApi.myServices()
        return response.data
      }

      if (!profile?.id) {
        throw new Error('Не удалось получить id пользователя')
      }

      const response = await serviceApi.servicesByUserId(profile.id)
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 20,
  })
}
