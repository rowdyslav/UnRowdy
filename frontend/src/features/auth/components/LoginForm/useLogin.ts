import type {
  LoginDataType,
  TokenDataType
} from "@/features/auth/types/auth.types.ts";
import {api} from "@/shared/api/axios.ts";
import {useState} from "react";
import {useAuthStore} from "@/features/auth/model/authStore.ts";
import type {UserType} from "@/features/auth/types/auth.ts";
import getInfoMeApi from "@/shared/api/userApi/getInfoMe.api.ts";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore(state => state.login)
  const setToken = useAuthStore(state => state.setToken)

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
      const access_token = data.access_token // bearer токен
      setToken(access_token) // сохраняем bearer токен в localStorage
      const userData: UserType = await getInfoMeApi() // получаем id, name, Email
      login(userData)
    }
    catch (err: any) {
      setError(err.response?.data?.message || "Ошибка регистрации");
      return false // если логин прошел НЕ успешно
    }
  }

  return {error, authLogin}
}