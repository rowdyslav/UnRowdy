import {useAppContext} from "@/app/providers/AppContext.tsx";

const MainPage = () => {
  const user = window.Telegram?.WebApp.initDataUnsafe?.user
  const {goNext} = useAppContext()

  return (
    <div className="w-full h-[90vh] rounded-xl flex flex-col items-center justify-around bg-blue-100 text-center p-4">
      <h1 className='text-3xl font-semibold absolute left-4 top-2 '>UnRowdy</h1>

      <h2 className="text-3xl font-bold mb-4">Привет, {user?.first_name}!</h2>

      <div>
        <p className="mb-3 text-xl font-semibold">Выберите категорию, чтобы найти услугу</p>
        <button
          onClick={goNext}
          className="px-6 py-3 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100 transition"
        >
          Выбрать категорию
        </button>
      </div>
    </div>
  );
};

export default MainPage;