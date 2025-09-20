import {api} from "@/shared/api/axios.ts";

const GetInfoMeApi = async () => {
  try {
    const response = await api.get('/users/me')
    return response.data
  } catch {
    return false  // при ошибке получения данных с сервера возвращает false
  }
}

export default GetInfoMeApi