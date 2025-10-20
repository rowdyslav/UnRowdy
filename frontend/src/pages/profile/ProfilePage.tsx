import type { TabProfile } from '@/pages/profile/tabs/TabsType.ts'
import Tabs from '@/pages/profile/tabs/Tabs.tsx'
import ServicesSection from '@/pages/profile/ServicesSection.tsx'
import FriendsSection from '@/pages/profile/FriendsSection.tsx'
import { useState } from 'react'
import UserCardSection from '@/pages/profile/UserCardSection.tsx'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabProfile>('Услуги')

  return (
    <>
      <UserCardSection />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Услуги' && <ServicesSection />}
      {activeTab === 'Друзья' && <FriendsSection />}
    </>
  )
}

export default ProfilePage
