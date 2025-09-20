import axios from "axios";
import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import {ROUTES} from "@/shared/const/routes.ts";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// при наличии access_token автоматом подставляется заголовок Authorization: Bearer eyJhbGciOiJIUzI1...
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


//проверка жизни токена
const handleUnauthorized = () => {
  const logout = useAuthStore.getState().logout;
  logout();
  window.location.href = ROUTES.AUTH;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

