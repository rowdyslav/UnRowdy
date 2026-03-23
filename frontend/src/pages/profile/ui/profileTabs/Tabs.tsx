import type { ProfileTabsProps } from '@/pages/profile/ui/profileTabs/TabsType.ts'
import { tabsProfileData } from '@/pages/profile/ui/profileTabs/TabsData.ts'

const Tabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => (
  <div className='container mb-8'>
    <div className='inline-grid w-full max-w-md rounded-lg bg-gray-100 p-1'>
      <div
        className='grid w-full'
        style={{
          gridTemplateColumns: `repeat(${tabsProfileData.length}, minmax(0, 1fr))`,
        }}
      >
        {tabsProfileData.map(tab => (
          <button
            key={tab.id}
            type='button'
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-md px-4 py-2 text-center shadow-sm transition-colors duration-150 cursor-pointer ${
              activeTab === tab.id ? 'bg-white color-font' : 'bg-transparent color-font-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  </div>
)

export default Tabs
