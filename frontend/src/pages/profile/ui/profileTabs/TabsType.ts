import type { Dispatch, SetStateAction } from 'react'

export type ProfileTabId = 'services' | 'friends'

export type ProfileTab = {
  id: ProfileTabId
  label: string
}

export type ProfileTabsProps = {
  activeTab: ProfileTabId
  setActiveTab: Dispatch<SetStateAction<ProfileTabId>>
}
