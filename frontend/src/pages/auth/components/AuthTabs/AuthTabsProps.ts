export type authTabNames = 'login' | 'registration'

export type AuthTabsProps = {
  activeTab: authTabNames
  setActiveTab: (tab: authTabNames) => void
}
