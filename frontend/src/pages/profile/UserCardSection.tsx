import LogoutButton
  from "@/features/auth/components/LogoutButton/LogoutButton.tsx";
import {useAuthStore} from "@/app/providers/auth/authStore.ts";

const UserCardSection = () => {
  const user = useAuthStore(state => state.user)

  return (
    <section className='container pt-[30px]'>
      <article className='bg-white rounded-lg shadow-sm p-[25px] flex gap-x-6'>
        <div
          style={{fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0 , 'opsz' 48"}}
        >
        <span
          className="material-symbols-outlined " style={{fontSize: '100px'}}
        >account_circle
        </span>
        </div>

        <div className='flex flex-col gap-y-2'>
          {user ? <p className='text-3xl font-bold color-font'>{user.username}</p> : null}
          {user ? <p className='color-font-light text-lg'>Очень крутой разработчик</p> : null}
        </div>
      </article>
      <LogoutButton/>
    </section>
  );
};

export default UserCardSection;