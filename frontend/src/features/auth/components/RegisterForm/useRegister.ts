import {useState} from "react";
import {api} from "@/shared/api/axios.ts";
import type {RegisterDataType} from "../../types/auth.types.ts";
import type {
  RegisterErrorResponse
} from "@/features/auth/components/RegisterForm/types/types.ts";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);

  const registration = async (data: RegisterDataType): Promise<boolean> => {
    setError(null);

    try {
      await api.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log(123)
      return true // если регистрация прошла успешно
    } catch (err: any) {
      const errorData: RegisterErrorResponse = err.response?.data;

      if (typeof errorData?.detail === "string") {
        setError('На этот Email уже зарегистрирован пользователь')
      } else {
        setError("Ошибка регистрации");
      }
      return false // если регистрация прошла НЕ успешно
    }
  };

  return {registration, error, setError};
};