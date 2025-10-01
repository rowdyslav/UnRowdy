import {api} from "@/shared/api/axios.ts";
import type {UserType} from "@/shared/types/userType.ts";

export const userApi = {
  getInfoMe: async () => {
    try {
      const response = await api.get('/users/me')
      return response.data
    } catch {
      return false
    }
  },

  getInfo: (username: string) =>
    api.get<UserType[]>(`/users?limit=1&username=${username}`)
}