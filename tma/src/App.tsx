import {useTelegramUser} from "./hooks/useTelegramUser/useTelegramUser.ts";

const Profile = () => {
  const {user} = useTelegramUser()
  // console.log(window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name)

  return (
    <div className="p-4">
      <h1 className='text-red-500'>Привет, {user?.first_name ?? 'пользователь'}!</h1>
      <p>ID: {user?.id} {user?.last_name}</p>
      <p>Username: @{user?.username}</p>
    </div>
  );
};

export default Profile;
