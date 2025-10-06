import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '@/shared/const/routes.ts'
import Layout from '@/app/layouts/mainLayout.tsx'
import { myProfileLoader, profileLoader, protectedLoader, publicLoader } from '@/app/router/loaders.ts'
import HomePage from '@/pages/home/HomePage.tsx'
import AddServicePage from '@/pages/addService/AddServicePage.tsx'
import ProfilePage from '@/pages/profile/ProfilePage.tsx'
import AuthPage from '@/pages/auth/AuthPage.tsx'
import NotFoundUser from '@/shared/components/NotFoundUser.tsx'
import Spinner from '@/shared/ui/Spinner.tsx'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    hydrateFallbackElement: <Spinner />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
        errorElement: <NotFoundUser />,
        loader: myProfileLoader,
      },
      {
        path: `${ROUTES.PROFILE}/:username`,
        element: <ProfilePage />,
        errorElement: <NotFoundUser />,
        loader: async ({ params }) => {
          if (params.username) await profileLoader(params.username)
        },
      },
      {
        path: ROUTES.ADD_SERVICE,
        element: <AddServicePage />,
        loader: protectedLoader,
      },
    ],
  },
  {
    path: ROUTES.AUTH,
    element: <AuthPage />,
    loader: publicLoader,
  },
  {
    path: '*',
    element: <Navigate to='/' replace />,
  },
])
