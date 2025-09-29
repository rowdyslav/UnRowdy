import MyCardSection from "@/pages/myProfile/MyCardSection.tsx";
import ProfileTabs
  from "@/shared/components/ProfileTabs/ProfileTabs.tsx";
import {useState} from "react";
import MyServicesSection from "@/pages/myProfile/MyServicesSection.tsx";
import MyFriendsSection from "@/pages/myProfile/MyFriendsSection.tsx";
import type {
  Tab
} from "@/shared/components/ProfileTabs/types/profileTabsType.ts";

const MyProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>({id: 0, label: 'Сервисы'});

  return (
    <>
      <MyCardSection/>
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab}/>

      {activeTab.label === 'Друзья' ? <MyFriendsSection/> : null}
      {activeTab.label === 'Сервисы' ? <MyServicesSection/> : null}
    </>
  );
};

export default MyProfilePage;