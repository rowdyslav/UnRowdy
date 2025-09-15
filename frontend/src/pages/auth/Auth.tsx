import {useState} from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthTabs from "@/pages/auth/components/AuthTabs";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'registration'>('login')

  return (
    <div className="flex justify-center">
      <div
        className='w-full max-w-[500px] mt-42 shadow-md flex flex-col p-4 items-stretch rounded-md text-center'
      >

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