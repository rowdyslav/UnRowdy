import {useState} from "react";
import {api} from "@/shared/api/axios.ts";
import type {
  RegisterErrorResponse
} from "@/features/auth/components/RegisterForm/types/types.ts";
import {useLogin} from "@/features/auth/components/LoginForm/useLogin.ts";
import type {AxiosError} from "axios";
import type {
  RegisterFormType
} from "@/features/auth/components/RegisterForm/types/RegisterForm.schema.ts";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const {authLogin} = useLogin()

  const registration = async (data: RegisterFormType) => {
    setError(null);

    try {
      await api.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      await authLogin(data) // если регистрация прошла успешно
    } catch (err: unknown) {
      const error = err as AxiosError<RegisterErrorResponse>;

      const errorData = error.response?.data;

      if (errorData?.detail === "REGISTER_USER_ALREADY_EXISTS") {
        setError('На этот Email уже зарегистрирован пользователь')
      } else {
        setError("Ошибка регистрации");
      }
    }
  };

  return {registration, error, setError};
};