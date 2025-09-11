import {api} from "@/shared/api/axios.ts";
import type {UserType} from "@/features/auth/types/auth.ts";
import type {
  RegisterErrorResponse
} from "@/features/auth/components/RegisterForm/types/types.ts";

const verifyApi = async () => {
  try {

    const {data}: { data: UserType } = await api.get('/users/me', {
      },
    )
    return data // возвращаем id, email, username
  } catch (err: any) {
    const errorData: RegisterErrorResponse = err.response?.data;
    console.error(errorData)
    return null  // при ошибке получения данных с сервера возвращает false
  }
}

export default verifyApi