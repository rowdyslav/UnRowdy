import type {UserCardProps} from "@/widgets/userCard/userCardProps.ts";
import LogoutButton
  from "@/features/auth/components/LogoutButton.tsx";

const UserCard = ({userName, type}: UserCardProps) => {

  console.log(userName)
  return (
    <article className='card-element p-6 flex gap-x-6'>
      <div
        style={{fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0 , 'opsz' 48"}}
      >
        <span
          className="material-symbols-outlined" style={{fontSize: '100px'}}
        >account_circle
        </span>
      </div>

      <div className='flex flex-col gap-y-2'>
        {userName ? <p
          className='text-3xl font-bold color-font'
        >{userName}</p> : null}

        {userName ? <p
          className='color-font-light text-lg'
        >Очень крутой разработчик</p> : null}
      </div>

      {type === 'myProfile' && (
        <div className='ml-auto pt-8'><LogoutButton/></div>
      )}
    </article>
  );
};

export default UserCard;