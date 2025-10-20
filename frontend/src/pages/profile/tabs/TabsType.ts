import type { Dispatch, SetStateAction } from 'react'

export type TabProfile = 'Друзья' | 'Услуги'

export type profileTabsProps = {
  activeTab: TabProfile
  setActiveTab: Dispatch<SetStateAction<TabProfile>>
}
