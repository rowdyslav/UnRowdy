import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import getInfoMeApi from "@/shared/api/user/getInfoMe.api.ts";
import type {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";
import type {
  LoginFormType
} from "@/features/auth/components/LoginForm/types/LoginForm.schema.ts";
import type {UserType} from "@/shared/types/userType.ts";
import type {ErrorResponse} from "@/shared/types/errorResponseType.ts";
import {authApi} from "@/shared/api/auth.ts";
import {useMutation} from "@tanstack/react-query";

export const useLogin = () => {
  const login = useAuthStore(state => state.login)
  const setToken = useAuthStore(state => state.setToken)
  const navigate = useNavigate()

  return useMutation<UserType, string, LoginFormType>({
    mutationFn: async (data) => {
      try {
        const { data: tokenData } = await authApi.login(data);
        setToken(tokenData.access_token);

        const userData: UserType = await getInfoMeApi();
        login(userData);

        return userData;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        if (error.response?.data?.detail === "LOGIN_BAD_CREDENTIALS") {
          throw "Неверный email или пароль";
        }
        throw "Ошибка авторизации";
      }
    },

    onSuccess: () => {
      navigate(ROUTES.HOME);
    },
  });
}