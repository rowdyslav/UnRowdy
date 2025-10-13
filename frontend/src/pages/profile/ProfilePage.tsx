import type { TabProfile } from '@/pages/profile/tabs/TabsType.ts'
import Tabs from '@/pages/profile/tabs/Tabs.tsx'
import ServicesSection from '@/pages/profile/ServicesSection.tsx'
import UserCardSection from '@/pages/profile/UserCardSection.tsx'
import FriendsSection from '@/pages/profile/FriendsSection.tsx'
import { useState } from 'react'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabProfile>('Сервисы')

  return (
    <>
      <UserCardSection />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'Сервисы' && <ServicesSection />}
      {activeTab === 'Друзья' && <FriendsSection />}
    </>
  )
}

export default ProfilePage
