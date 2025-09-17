import {api} from "@/shared/api/axios.ts";
import {useState} from "react";
import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import type {UserType} from "@/app/providers/auth/types.ts";
import getInfoMeApi from "@/shared/api/userApi/getInfoMe.api.ts";
import type {TokenDataType} from "@/features/auth/components/LoginForm/types/types.ts";
import type {
  ErrorResponse
} from "@/shared/types/ErrorResponseType.ts";
import type {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";
import type {
  LoginFormType
} from "@/features/auth/components/LoginForm/types/LoginForm.schema.ts";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore(state => state.login)
  const setToken = useAuthStore(state => state.setToken)
  const navigate = useNavigate()

  const authLogin = async ({email, password}: LoginFormType) => {
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
      const error = err as AxiosError<ErrorResponse>;

      if (error.response?.data?.detail === 'LOGIN_BAD_CREDENTIALS') {
        setError('Неверный email или пароль')
      }
    }
  }

  return {error, authLogin, setError}
}