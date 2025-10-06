import type { TabProfile, TabService } from '@/shared/components/tabs/TabsType.ts'
import Tabs from '@/shared/components/tabs/Tabs.tsx'
import ServicesSection from '@/pages/profile/ServicesSection.tsx'
import UserCardSection from '@/pages/profile/UserCardSection.tsx'
import FriendsSection from '@/pages/profile/FriendsSection.tsx'
import { useState } from 'react'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabProfile | TabService>('Сервисы')

  return (
    <>
      <UserCardSection />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} type={'профиль'} />

      {activeTab === 'Сервисы' && <ServicesSection />}
      {activeTab === 'Друзья' && <FriendsSection />}
    </>
  )
}

export default ProfilePage
