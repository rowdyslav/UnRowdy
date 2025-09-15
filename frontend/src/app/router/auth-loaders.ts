import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import {redirect} from "react-router-dom";
import {ROUTES} from "@/app/router/routes.ts";

export const protectedLoader = () => {
  const  isAuthenticated = useAuthStore.getState().isAuthenticated

  if (!isAuthenticated) return redirect(ROUTES.AUTH);

  return null;
};

export const publicLoader = () => {
  const  isAuthenticated = useAuthStore.getState().isAuthenticated

  if (isAuthenticated) {
    return redirect(ROUTES.HOME);
  }
  return null;
};