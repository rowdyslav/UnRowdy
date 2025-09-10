import type {
  AuthTabsProps
} from "@/pages/auth/components/AuthTabs/types/AuthTabsProps";

const AuthTabs = ({activeTab, setActiveTab}: AuthTabsProps) => {

  return (
    <div className="mx-auto w-full p-6 bg-white rounded-lg ">
      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "login"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Вход
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "registration"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("registration")}
        >
          Регистрация
        </button>
      </div>
    </div>
  );
};

export default AuthTabs;