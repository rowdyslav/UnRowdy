import type { Dispatch, SetStateAction } from 'react'

export type TabProfile = 'Друзья' | 'Сервисы' | 'Другое'
export type TabService = 'Редактирование' | 'просмотр'

export type profileTabsProps = {
  activeTab: TabProfile | TabService
  setActiveTab: Dispatch<SetStateAction<TabProfile | TabService>>
  type: 'профиль' | 'Услуга'
}
