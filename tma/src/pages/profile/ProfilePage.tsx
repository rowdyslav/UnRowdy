const ProfilePage = ({goNext}: {goNext: () => void}) => {
  const user = window.Telegram?.WebApp.initDataUnsafe?.user

  return (
    <div className="w-full h-[90vh] rounded-xl flex flex-col items-center justify-center bg-blue-300 text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Привет, {user?.first_name}!</h1>
      <p className="mb-6 text-lg">Выберите категорию, чтобы начать услугу</p>
      <button
        onClick={goNext}
        className="px-6 py-3 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100 transition"
      >
        Выбрать категорию
      </button>
    </div>
  );
};

export default ProfilePage;