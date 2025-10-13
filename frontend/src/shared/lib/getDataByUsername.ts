import { userApi } from '@/shared/api/user.ts'

export const getDataByUsername = async (username: string) => {
  const response = await userApi.getInfoByName(username)

  if (response.data.length !== 0) {
    return response.data[0]
  } else {
    throw new Error('Ошибка получения данных по имени')
  }
}
