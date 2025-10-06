import type { AuthTabsProps } from '@/pages/auth/components/AuthTabs/AuthTabsProps.ts'

const AuthTabs = ({ activeTab, setActiveTab }: AuthTabsProps) => {
  const handleSwitchTab = () => {
    setActiveTab(`${activeTab === 'login' ? 'registration' : 'login'}`)
  }

  return (
    <div className='mx-auto w-full p-6 bg-white rounded-lg'>
      <div className='flex border-b border-gray-300 mb-4 relative' onClick={handleSwitchTab}>
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === 'login' ? ' text-blue-500' : 'text-gray-500 hover:text-blue-500'
          }`}
        >
          Вход
        </button>

        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === 'registration' ? ' text-blue-500' : 'text-gray-500 hover:text-blue-500'
          }`}
        >
          Регистрация
        </button>

        {/*Анимированная полоска под табами*/}
        <span
          className={`absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-400`}
          style={{
            width: '50%',
            transform: `translateX(${activeTab === 'login' ? '0%' : '100%'})`,
          }}
        />
      </div>
    </div>
  )
}

export default AuthTabs
