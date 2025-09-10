import { useState } from "react";
import { api } from "@/shared/api/axios";
import type { RegisterData, RegisterResponse } from "../types/auth.types";

export const useRegister = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<RegisterResponse | null>(null);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<RegisterResponse>("/auth/register", {
        password: data.password,
        username: data.username
      });
      setUser(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return { register, isLoading, error, user };
};