import UserCardSection from "@/pages/profile/UserCardSection.tsx";
import ProfileTabs
  from "@/pages/profile/components/ProfileTabs/ProfileTabs.tsx";
import {useState} from "react";
import type {ActiveTabType} from "@/pages/profile/types/activeTabType.ts";
import FriendsSection from "@/pages/profile/FriendSection.tsx";
import ServicesSection from "@/pages/profile/ServicesSection.tsx";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>({id:0, isActive: 'Services'});

  return (
    <>
      <UserCardSection/>
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

      {activeTab.isActive === 'Friends' ? <FriendsSection/> : null}
      {activeTab.isActive === 'Services' ? <ServicesSection/> : null}
      </>
  );
};

export default ProfilePage;