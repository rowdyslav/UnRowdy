import type {
  LoginDataType,
  TokenDataType
} from "@/features/auth/types/auth.types.ts";
import {api} from "@/shared/api/axios.ts";
import {useState} from "react";
import {useAuthStore} from "@/features/auth/model/authStore.ts";
import type {UserType} from "@/features/auth/types/auth.ts";
import getInfoMeApi from "@/shared/api/userApi/getInfoMe.api.ts";
import type {
  LoginErrorResponse
} from "@/features/auth/components/LoginForm/types/types.ts";
import type {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/app/router/routes.ts";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore(state => state.login)
  const setToken = useAuthStore(state => state.setToken)
  const navigate = useNavigate()

  const authLogin = async ({email, password}: LoginDataType) => {
    const dataGetToken = new URLSearchParams();
    dataGetToken.append("username", email);
    dataGetToken.append("password", password);

    try {
      const {data}: {
        data: TokenDataType
      } = await api.post("/auth/login", dataGetToken, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setToken(data.access_token) // сохраняем bearer токен в localStorage

      const userData: UserType = await getInfoMeApi() // получаем id, name, Email
      login(userData) // сохраняем id, name, Email в localStorage

      navigate(ROUTES.HOME) // направляем на главную страницу

    } catch (err: unknown) {
      const error = err as AxiosError<LoginErrorResponse>;

      if (error.response?.data?.detail === 'LOGIN_BAD_CREDENTIALS') {
        setError('Неверный email или пароль')
      }
    }
  }

  return {error, authLogin, setError}
}