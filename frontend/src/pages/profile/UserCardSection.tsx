import LogoutButton
  from "@/features/auth/components/LogoutButton/LogoutButton.tsx";
import {useAuthStore} from "@/app/providers/auth/authStore.ts";

const UserCardSection = () => {
  const user = useAuthStore(state => state.user)

  return (
    <section className='container mb-8'>
      <article className='card-element p-6 flex gap-x-6'>
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

        <div className='flex flex-col color-font-light'>
          ВРЕМЕННОЕ РАСПОЛОЖЕНИЕ КНОПКИ ВЫХОДА
      <LogoutButton/>
        </div>
      </article>
    </section>
  );
};

export default UserCardSection;