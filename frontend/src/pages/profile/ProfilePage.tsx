import ProfileTabs
  from "@/shared/components/ProfileTabs/ProfileTabs.tsx";
import {useState} from "react";
import FriendsSection from "@/pages/profile/FriendsSection.tsx";
import UserCardSection from "@/pages/profile/UserCardSection.tsx";
import type {
  Tab
} from "@/shared/components/ProfileTabs/types/profileTabsType.ts";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>({id: 0, label: 'Сервисы'});

  return (
    <>
      <UserCardSection/>
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab}/>

      {activeTab.label === 'Сервисы' ? <p></p> : null}
      {activeTab.label === 'Друзья' ? <FriendsSection/> : null}
    </>
  );
};

export default ProfilePage;