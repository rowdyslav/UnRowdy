export type TabNames = 'Друзья' | 'Сервисы' | 'Другое'

export type Tab = {
  id: number;
  label: TabNames;
};

export type ActiveTabType = {
  id: number;
  name: TabNames
}

export type profileTabsProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};