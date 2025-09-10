import {useState} from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthTabs from "@/pages/auth/components/AuthTabs";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'registration'>('login')

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div
        className='w-full max-w-[500px] shadow-md flex flex-col p-4 items-stretch rounded-xl text-center'
      >

        <h1 className="  text-foreground mb-2 text-3xl ">
          {activeTab === 'login' ? 'Вход' : 'Регистрация'}
        </h1>

        <h2 className='text-xl'>
          {activeTab === 'login' ? 'Войдите в свой аккаунт' : 'Зарегистрируйтесь в свой аккаунт'}
        </h2>

        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

        {activeTab === 'login' ? <LoginForm/> : <RegisterForm/>}
      </div>
    </div>
  );
};

export default AuthPage;