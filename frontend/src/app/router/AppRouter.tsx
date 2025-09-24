import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";
import Auth from "@/pages/auth/Auth.tsx";
import Layout from "@/app/layouts/main/mainLayout.tsx";
import {protectedLoader, publicLoader} from "@/app/router/auth-loaders.ts";
import ProfilePage from "@/pages/profile/ProfilePage.tsx";
import HomePage from "@/pages/home/HomePage.tsx";
import AddServicePage from "@/pages/addService/AddServicePage.tsx";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: ROUTES.PROFILE, element: <ProfilePage/>, loader: protectedLoader},
      {path: ROUTES.ADD_SERVICE, element: <AddServicePage/>, loader: protectedLoader}
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
