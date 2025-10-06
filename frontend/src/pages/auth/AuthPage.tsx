import type { authTabNames } from '@/pages/auth/components/AuthTabs/AuthTabsProps.ts'
import RegisterForm from '@/features/auth/components/RegisterForm.tsx'
import AuthTabs from '@/pages/auth/components/AuthTabs/AuthTabs.tsx'
import BadgeButton from '@/shared/components/navBadge/NavBadge.tsx'
import LoginForm from '@/features/auth/components/LoginForm.tsx'
import { Activity, useState } from 'react'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<authTabNames>('login')

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-[500px] mt-42 card-element flex flex-col p-4 items-stretch text-center relative'>
        <div className='absolute top-[23px]'>
          <BadgeButton to={-1} size={'sm'} label={'Назад'} />
        </div>

        <h1 className='text-foreground mb-2 text-2xl'>
          {activeTab === 'login' ? 'Войдите в свой аккаунт' : 'Зарегистрируйте аккаунт'}
        </h1>

        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <Activity mode={activeTab === 'login' ? 'visible' : 'hidden'}>
          <LoginForm />
        </Activity>

        <Activity mode={activeTab === 'registration' ? 'visible' : 'hidden'}>
          <RegisterForm />
        </Activity>
      </div>
    </div>
  )
}

export default AuthPage
