import MyCardSection from "@/pages/my/MyCardSection.tsx";
import ProfileTabs
  from "@/shared/components/ProfileTabs/ProfileTabs.tsx";
import {useState} from "react";
import MyServicesSection from "@/pages/my/MyServicesSection.tsx";
import type {
  Tab
} from "@/shared/components/ProfileTabs/types/profileTabsType.ts";
import FriendsSection from "@/pages/profile/FriendsSection.tsx";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>({id: 0, label: 'Сервисы'});

  return (
    <>
      <MyCardSection/>
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab}/>

      {activeTab.label === 'Сервисы' ? <MyServicesSection/> : null}
      {activeTab.label === 'Друзья' ? <FriendsSection type={"myProfile"}/> : null}
    </>
  );
};

export default MyPage;