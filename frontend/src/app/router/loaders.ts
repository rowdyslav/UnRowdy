import { useAuthStore } from '@/app/providers/auth/authStore.ts'
import { redirect } from 'react-router-dom'
import { ROUTES } from '@/shared/const/routes.ts'
import { userApi } from '@/shared/api/user.ts'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import { getDataByUsername } from '@/shared/lib/getDataByUsername.ts'

export const protectedLoader = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  if (!isAuthenticated) return redirect(ROUTES.HOME)
  return null
}

export const publicLoader = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  if (isAuthenticated) return redirect(ROUTES.HOME)
}

export const profileLoader = async (username: string) => {
  const userData = await getDataByUsername(username)

  if (userData) {
    useProfileStore.getState().setProfile(userData)
  } else {
    throw new Response('User not found', { status: 404 })
  }
}

export const myProfileLoader = async () => {
  protectedLoader()
  const data = await userApi.getInfoMe()

  if (data.data) useProfileStore.getState().setMyProfile(data.data)
  else redirect(ROUTES.HOME)
}
