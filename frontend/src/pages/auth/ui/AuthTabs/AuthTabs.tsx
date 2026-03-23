import type { AuthTabsProps } from '@/pages/auth/ui/AuthTabs/AuthTabsProps.ts'

const AUTH_TABS = [
  { id: 'login', label: 'Вход' },
  { id: 'registration', label: 'Регистрация' },
] as const

const AuthTabs = ({ activeTab, setActiveTab }: AuthTabsProps) => (
  <div className='mx-auto w-full p-6 bg-white rounded-lg'>
    <div
      className='grid border-b border-gray-300 mb-4'
      style={{ gridTemplateColumns: `repeat(${AUTH_TABS.length}, minmax(0, 1fr))` }}
    >
      {AUTH_TABS.map(tab => (
        <button
          key={tab.id}
          type='button'
          className={`border-b-2 py-2 text-center font-medium transition-colors ${
            activeTab === tab.id
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
)

export default AuthTabs
