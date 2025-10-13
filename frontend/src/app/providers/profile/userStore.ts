import { create } from 'zustand'
import type { ProfileStoreType } from '@/app/providers/profile/types.ts'

export const useProfileStore = create<ProfileStoreType>(set => ({
  profile: null,
  isMyProfile: false,

  setProfile: user => set(() => ({ profile: user, isMyProfile: false })),
  setMyProfile: user => set(() => ({ profile: user, isMyProfile: true })),
}))
