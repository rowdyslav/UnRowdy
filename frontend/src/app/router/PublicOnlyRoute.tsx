import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/model/authStore';
import {ROUTES} from "@/app/router/routes.ts";
import type {
  PublicOnlyRouteProps
} from "@/app/router/types/PublicOnlyRouteProps.ts";



export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Если пользователь уже авторизован, редиректим на главную
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};