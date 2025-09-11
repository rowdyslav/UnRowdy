import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "@/app/router/routes.ts";
import {PublicOnlyRoute} from "@/app/router/PublicOnlyRoute.tsx";
import ProtectedRoute from "@/app/router/ProtectedRoute.tsx";
import Home from "@/pages/Home";
import Auth from "@/pages/auth/Auth.tsx";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.AUTH,
    element: (
      <PublicOnlyRoute>
        <Auth />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to = '/' replace />
  }
])
