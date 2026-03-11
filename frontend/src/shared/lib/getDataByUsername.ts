import { userApi } from '@/shared/api/user.ts'
import type { UserType } from '@/shared/types/userType.ts'

export const getDataByUsername = async (username: string): Promise<UserType | null> => {
  const response = await userApi.getInfoByName(username)

  return response.data[0] ?? null
}
