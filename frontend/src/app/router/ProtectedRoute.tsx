import {useAuthStore} from "@/features/auth/model/authStore.ts";
import {ROUTES} from "@/app/router/routes.ts";
import {Navigate} from "react-router-dom";
import type {
  ProtectedRouteProps
} from "@/app/router/types/ProtectedRouteProps.ts";


const ProtectedRoute = ({
                          children,
                          redirectTo = ROUTES.AUTH,
                          requireAuth = true
                        }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const isLoading = useAuthStore(state => state.isLoading)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>
    );
  }

  // Если требуется аутентификация, но пользователь не авторизован - перенаправление на страницу входа
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>
};


export default ProtectedRoute;
