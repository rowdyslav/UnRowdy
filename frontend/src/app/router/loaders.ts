import { useAuthStore } from '@/app/providers/auth/authStore.ts'
import { redirect } from 'react-router-dom'
import { ROUTES } from '@/shared/routes/routes.ts'
import { userApi } from '@/shared/api/user.ts'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import { getDataByUsername } from '@/shared/lib/getDataByUsername.ts'
import { serviceApi } from '@/shared/api/service/serviceApi.ts'

export const protectedLoader = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  if (!isAuthenticated) return redirect(ROUTES.HOME)
  return null
}

export const publicLoader = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  if (isAuthenticated) return redirect(ROUTES.HOME)
  return null
}

export const profileLoader = async (username: string) => {
  const userData = await getDataByUsername(username)

  if (!userData) {
    throw new Response('User not found', { status: 404 })
  }

  useProfileStore.getState().setProfile(userData)
}

export const myProfileLoader = async () => {
  const authRedirect = protectedLoader()
  if (authRedirect) return authRedirect

  const data = await userApi.getInfoMe()

  if (data.data) {
    useProfileStore.getState().setMyProfile(data.data)
    return null
  }

  return redirect(ROUTES.HOME)
}

export const serviceLoader = async (serviceId: string) => {
  const data = await serviceApi.byId(serviceId)

  if (data.data) return data.data
}
