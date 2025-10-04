import { userApi } from '@/shared/api/user.ts'

export const getDataByUsername = async (username: string) => {
  try {
    const response = await userApi.getInfoByName(username)

    if (response.data[0]) {
      return response.data[0]
    }

  } catch (e) {
    console.log(e)
  }
}
