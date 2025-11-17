import ServiceTape from "@/features/serviceTape/ServiceTape.tsx";

const Profile = () => {
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

  return (
    <>
      <div className='absolute z-30'>
        <h1 className='text-red-500'>Привет, {user?.first_name ?? 'пользователь'}!</h1>
        <p>ID: {user?.id} {user?.last_name}</p>
        <p>Username: @{user?.username}</p>
      </div>
      <ServiceTape/>
    </>
  );
};

export default Profile;
