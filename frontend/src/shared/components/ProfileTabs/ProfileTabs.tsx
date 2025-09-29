import {
  profileTabsData
} from "@/shared/components/ProfileTabs/profileTabsData.ts";
import type {
  profileTabsProps
} from "@/shared/components/ProfileTabs/types/profileTabsType.ts";

const ProfileTabs = ({activeTab, onTabChange}: profileTabsProps) => {
  return (
    <div className='container mb-8'>
      <div className="relative flex bg-gray-100 rounded-lg p-1 w-fit">

        {profileTabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange({id: tab.id, label: tab.label})}
            className={`px-4 py-2 rounded-md min-w-48 z-10 transition-all color-font duration-150 cursor-pointer`}
          >
            {tab.label}
          </button>
        ))}

        {/* Индикатор активного таба */}
        <div
          className="absolute top-1 bottom-1 bg-white shadow rounded-md transition-all duration-300"
          style={{
            width: "12rem",
            transform: `translateX(${+activeTab.id * 12}rem)`,
          }}
        />
      </div>
    </div>
  );
};

export default ProfileTabs;