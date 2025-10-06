import type { profileTabsProps, TabProfile, TabService } from '@/shared/components/tabs/TabsType.ts'
import { tabsProfileData, tabsServiceData } from '@/shared/components/tabs/TabsProfileData.ts'

const Tabs = ({ activeTab, setActiveTab, type }: profileTabsProps) => {
  let data: TabProfile[] | TabService[]

  if (type === 'профиль') data = tabsProfileData
  else data = tabsServiceData

  const tabId = () => data.indexOf(activeTab as never)

  return (
    <div className='container mb-8'>
      <div className='relative flex bg-gray-100 rounded-lg p-1 w-fit'>
        {data.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md min-w-48 z-10 transition-all color-font duration-150 cursor-pointer`}
          >
            {tab}
          </button>
        ))}

        {/* Индикатор активного таба */}
        <div
          className='absolute top-1 bottom-1 bg-white shadow rounded-md transition-all duration-300'
          style={{
            width: '12rem',
            transform: `translateX(${+tabId() * 12}rem)`,
          }}
        />
      </div>
    </div>
  )
}

export default Tabs
