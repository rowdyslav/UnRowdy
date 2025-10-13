import type { Dispatch, SetStateAction } from 'react'

export type TabProfile = 'Друзья' | 'Сервисы'

export type profileTabsProps = {
  activeTab: TabProfile
  setActiveTab: Dispatch<SetStateAction<TabProfile>>
}
