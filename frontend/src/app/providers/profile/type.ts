import type { UserType } from '@/shared/types/userType.ts'

export type ProfileStoreType = {
  profile: UserType | null
  isMyProfile: boolean

  setProfile: (user: UserType) => void
  setMyProfile: (user: UserType) => void
}
