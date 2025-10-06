import { api } from '@/shared/api/axios.ts'
import type { UserType } from '@/shared/types/userType.ts'

export const userApi = {
  getInfoMe: () => api.get<UserType>('/users/me'),

  getInfoByName: (username: string) => api.get<UserType[]>(`/users?&username=${username}`),
}
