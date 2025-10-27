import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '@/shared/routes/routes.ts'
import Layout from '@/app/layouts/mainLayout.tsx'
import {
  myProfileLoader,
  profileLoader,
  protectedLoader,
  publicLoader,
  serviceLoader,
} from '@/app/router/loaders.ts'
import HomePage from '@/pages/home/HomePage.tsx'
import AddPage from '@/pages/add/AddPage.tsx'
import ProfilePage from '@/pages/profile/ProfilePage.tsx'
import AuthPage from '@/pages/auth/AuthPage.tsx'
import NotFoundUser from '@/shared/components/NotFoundUser.tsx'
import Spinner from '@/shared/ui/Spinner.tsx'
import ServicePage from '@/pages/service/ServicePage.tsx'
import CataloguePage from '@/pages/catalogue/CataloguePage.tsx'
import ServicesPage from '@/pages/services/ServicesPage.tsx'

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
        errorElement: <Navigate to='/' replace />,
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
        element: <AddPage />,
        loader: protectedLoader,
      },
      {
        path: `${ROUTES.SERVICE}/:serviceId`,
        element: <ServicePage />,
        errorElement: <NotFoundUser />,
        loader: async ({ params }) => {
          if (params.serviceId) return await serviceLoader(params.serviceId)
        },
      },
      {
        path: ROUTES.CATEGORIES,
        element: <CataloguePage />,
      },
      {
        path: `${ROUTES.CATEGORIES}/:category_name`,
        element: <ServicesPage />,
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
