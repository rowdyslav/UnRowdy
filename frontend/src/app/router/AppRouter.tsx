import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "@/app/router/routes.ts";
import Home from "@/pages/Home";
import Auth from "@/pages/auth/Auth.tsx";
import Layout from "@/app/layouts/main/mainLayout.tsx";
import {protectedLoader, publicLoader} from "@/app/router/auth-loaders.ts";
import Test from "@/pages/test/test.tsx";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout/>,
    loader: protectedLoader,
    children: [
      {index: true, element: <Home/>},
      {path: '/test', element: <Test/>},
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
