import {useAuthStore} from "@/features/auth/model/authStore.ts";
import {ROUTES} from "@/app/router/routes.ts";
import {Navigate} from "react-router-dom";
import type {
  ProtectedRouteProps
} from "@/app/router/types/ProtectedRouteProps.ts";


const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  // если пользователь не авторизован, перенаправление на auth page
  return isAuthenticated ? children : <Navigate to={ROUTES.AUTH} replace/>;
};

export default ProtectedRoute;
