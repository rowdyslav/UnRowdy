import axios from "axios";
import {useAuthStore} from "@/features/auth/model/authStore.ts";

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