import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";
import {authApi} from "@/shared/api/auth.ts";
import {useMutation} from "@tanstack/react-query";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await authApi.logout()
    },

    onSuccess: () => {
      useAuthStore.getState().logout();
      navigate(ROUTES.AUTH);
    },

    onError: (error) => {
      console.warn("Logout error:", error);
    },
  });
};
