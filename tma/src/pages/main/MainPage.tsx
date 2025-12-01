import { useAppContext } from "@/app/providers/AppContext.tsx";
import OpenChatButton from "@/share/components/OpenChatButton.tsx";

const MainPage = () => {
  const user = window.Telegram?.WebApp.initDataUnsafe?.user;
  const { goNext } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-10 -left-20 w-64 h-64 bg-blue-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-300/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col min-h-screen px-6 py-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-gray-800 drop-shadow-sm">UnRowdy</h1>
        </header>

        <main className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="mb-14">
            <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
              {user?.photo_url ? (
                <img
                  src={user.photo_url}
                  alt={user.first_name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl text-blue-600">
                  {user?.first_name?.[0]?.toUpperCase() || '👤'}
                </span>
              )}
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Привет, {user?.first_name || 'друг'}!
            </h2>
            <p className="text-gray-600 text-lg">Рады видеть вас снова</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 w-full max-w-sm border border-blue-100 shadow-xl">
            <div className="mb-6">
              <OpenChatButton username="rowdyslav" message='попа'/>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Найдём нужную услугу
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Выберите категорию и мы подберём лучших специалистов для ваших задач
              </p>
            </div>

            <button
              onClick={goNext}
              className="w-full py-4 bg-blue-500 text-white font-bold rounded-2xl
              active:scale-101 transition-all duration-200 shadow-lg hover:shadow-blue-200 flex
              items-center justify-center gap-2"
            >
              <span>Выбрать категорию</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </main>

        <footer className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            UnRowdy — ваш помощник в поиске услуг
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;