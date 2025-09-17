import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";
import Auth from "@/pages/auth/Auth.tsx";
import Layout from "@/app/layouts/main/mainLayout.tsx";
import {protectedLoader, publicLoader} from "@/app/router/auth-loaders.ts";
import Home from "@/pages/Home/Home.tsx";
import Profile from "@/pages/profile/Profile.tsx";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout/>,
    children: [
      {index: true, element: <Home/>},
      {path: ROUTES.PROFILE, element: <Profile/>, loader: protectedLoader},
    ]
  },
  {
    path: ROUTES.AUTH,
    loader: publicLoader,
    element: (
      <Auth/>
    ),
  },
  {
    path: '*',
    element: <Navigate to='/' replace/>
  }
])
