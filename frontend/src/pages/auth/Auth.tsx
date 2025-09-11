import {useState} from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthTabs from "@/pages/auth/components/AuthTabs";
import {useAuthStore} from "@/features/auth/model/authStore.ts";

const AuthPage = () => {
  const token = useAuthStore(state => state.token)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  console.log('token:', token)
  console.log('isAuthenticated:', isAuthenticated)

  const [activeTab, setActiveTab] = useState<'login' | 'registration'>('login')

  return (
    <div className=" flex justify-center ">
      <div
        className='w-full max-w-[500px] mt-42 shadow-md flex flex-col p-4 items-stretch rounded-md text-center'
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