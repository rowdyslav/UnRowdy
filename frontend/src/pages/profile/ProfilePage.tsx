import ProfileServicesSection from '@/pages/profile/ui/profileServices.tsx'
import type { TabProfile } from '@/pages/profile/ui/profileTabs/TabsType.ts'
import FriendsSection from '@/pages/profile/ui/FriendsSection.tsx'
import Tabs from '@/pages/profile/ui/profileTabs/Tabs.tsx'
import { useState } from 'react'
import UserCard from '@/entities/user/ui/userCard/UserCard.tsx'
import LogoutButton from '@/features/auth/ui/LogoutButton.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabProfile>('Услуги')
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const profile = useProfileStore(state => state.profile)

  return (
    <>
      <section className='container mb-8'>
        <UserCard name={profile?.username || ''} className='h-36'>
          {isMyProfile && <LogoutButton />}
        </UserCard>
      </section>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Услуги' && <ProfileServicesSection />}
      {activeTab === 'Друзья' && <FriendsSection />}
    </>
  )
}

export default ProfilePage
