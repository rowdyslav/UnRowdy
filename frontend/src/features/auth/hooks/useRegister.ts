import { useState } from "react";
import { api } from "@/shared/api/axios";
import type { RegisterData } from "../types/auth.types";

export const useRegister = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
        await api.post("/auth/register", {
        username: data.username,
          email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return { register, isLoading, error };
};