import type {
  LoginDataType,
  TokenDataType
} from "@/features/auth/types/auth.types.ts";
import {api} from "@/shared/api/axios.ts";
import {useState} from "react";
import {useAuthStore} from "@/features/auth/model/authStore.ts";
import verifyApi from "@/shared/api/auth/verifyApi.ts";
import type {UserType} from "@/features/auth/types/auth.ts";
import getInfoMeApi from "@/shared/api/userApi/getInfoMe.api.ts";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore(state => state.login)

  const authLogin = async ({email, password}: LoginDataType) => {
    const dataGetToken = new URLSearchParams();
    dataGetToken.append("username", email);
    dataGetToken.append("password", password);

    try {
      const {data}: { data: TokenDataType } = await api.post("/auth/login", dataGetToken, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const access_token = data.access_token

      const userData: UserType | null = await verifyApi(access_token)

      if (!userData) {
        console.log("Не удалось получить данные пользователя")
        setError("Не удалось получить данные пользователя");
        return false;
      }

      login(access_token, userData)


      const m = await getInfoMeApi()
      console.log(m)
    }
    catch (err: any) {
      setError(err.response?.data?.message || "Ошибка регистрации");
      return false // если логин прошел НЕ успешно
    }
  }

  return {error, authLogin}
}