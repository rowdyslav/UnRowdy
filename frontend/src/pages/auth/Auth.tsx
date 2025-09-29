import {useState} from "react";
import AuthTabs from "@/pages/auth/components/AuthTabs/AuthTabs.tsx";
import RegisterForm
  from "@/features/auth/components/RegisterForm.tsx";
import LoginForm from "@/features/auth/components/LoginForm.tsx";
import BackPageBadge from "@/shared/components/backPageBadge/BackPageBadge.tsx";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'registration'>('login')

  return (
    <div className="flex justify-center">
      <div
        className='w-full max-w-[500px] mt-42 card-element flex flex-col p-4 items-stretch  text-center relative'
      >
        <div className='absolute top-[23px]'>
          <BackPageBadge size={"sm"} label={"Назад"}/>
        </div>

        <h1 className="text-foreground mb-2 text-2xl">
          {activeTab === 'login' ? 'Войдите в свой аккаунт' : 'Зарегистрируйте аккаунт'}
        </h1>

        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

        {activeTab === 'login' ? <LoginForm/> : <RegisterForm/>}
      </div>
    </div>
  );
};

export default AuthPage;