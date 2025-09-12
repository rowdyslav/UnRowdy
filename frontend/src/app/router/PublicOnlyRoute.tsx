import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/model/authStore';
import {ROUTES} from "@/app/router/routes.ts";
import type {
  PublicOnlyRouteProps
} from "@/app/router/types/PublicOnlyRouteProps.ts";


export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { isAuthenticated } = useAuthStore();

// если пользователь авторизован, перенаправление на main page
  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : children;
};