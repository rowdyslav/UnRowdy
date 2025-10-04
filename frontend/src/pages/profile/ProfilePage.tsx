import type { TabNames } from '@/pages/profile/components/ProfileTabs/profileTabsType.ts'
import ProfileTabs from '@/pages/profile/components/ProfileTabs/ProfileTabs.tsx'
import ServicesSection from '@/pages/profile/ServicesSection.tsx'
import UserCardSection from '@/pages/profile/UserCardSection.tsx'
import FriendsSection from '@/pages/profile/FriendsSection.tsx'
import { useState } from 'react'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabNames>('Сервисы')

  return (
    <>
      <UserCardSection />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'Сервисы' && <ServicesSection />}
      {activeTab === 'Друзья' && <FriendsSection />}
    </>
  )
}

export default ProfilePage
