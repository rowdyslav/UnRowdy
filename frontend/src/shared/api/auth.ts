import type {
  TokenDataType
} from "@/features/auth/components/LoginForm/types/types.ts";
import {api} from "@/shared/api/axios.ts";
import type {
  LoginFormType
} from "@/features/auth/components/LoginForm/types/LoginForm.schema.ts";
import type {
  RegisterFormType
} from "@/features/auth/components/RegisterForm/types/RegisterForm.schema.ts";

export const authApi = {
  login: (data: LoginFormType) => {
    const formData = new URLSearchParams();
    formData.append("username", data.email);
    formData.append("password", data.password);

    return api.post<TokenDataType>("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  },

  register: (data: RegisterFormType) => {
    return api.post("/auth/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  },

  logout: () => api.post('/auth/logout')
}