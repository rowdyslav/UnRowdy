export type TabNames = 'Друзья' | 'Сервисы' | 'Другое'

export type profileTabsProps = {
  activeTab: TabNames
  setActiveTab: (tab: TabNames) => void
}
