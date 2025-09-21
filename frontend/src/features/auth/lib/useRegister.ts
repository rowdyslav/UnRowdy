import {useLogin} from "@/features/auth/lib/useLogin.ts";
import type {AxiosError} from "axios";
import type {
  RegisterFormType
} from "@/features/auth/components/RegisterForm/types/RegisterForm.schema.ts";
import type {ErrorResponse} from "@/shared/types/errorResponseType.ts";
import {authApi} from "@/shared/api/auth.ts";
import {useMutation} from "@tanstack/react-query";

export const useRegister = () => {
  const loginMutation = useLogin();

  return useMutation<void, string, RegisterFormType>({
    mutationFn: async (data) => {
      try {
        await authApi.register(data);

        await loginMutation.mutateAsync(data);
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;

        if (error.response?.data?.detail === "REGISTER_USER_ALREADY_EXISTS") {
          throw "На этот Email уже зарегистрирован пользователь";
        }

        throw "Ошибка регистрации";
      }
    },
  });
};