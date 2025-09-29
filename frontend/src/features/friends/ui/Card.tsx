import type {
  CardProps
} from "@/features/friends/types/friendCardProps.ts"
import DeleteButton
  from "@/features/friends/components/RemoveButton.tsx";
import ViewProfileButton
  from "@/features/friends/components/ViewProfileButton.tsx";

const RequestCard = ({name, id, type}: CardProps) => {
  return (
    <article
      className='card-element p-4 flex justify-between items-center'
    >
      <div className='flex gap-x-3'>
        <div
          className='content-center flex'
          style={{fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0 , 'opsz' 48"}}
        >
          <span
            className="material-symbols-outlined" style={{fontSize: '50px'}}
          >account_circle
        </span>
        </div>

        <div className='flex flex-col'>
          {name ?
            <p className='text-xl font-bold color-font'>{name}</p> : null}
          {name ? <p
            className='color-font-light'
          >Очень крутой разработчик</p> : null}
        </div>
      </div>

      <div className='flex gap-x-2'>
        <ViewProfileButton id={id}/>
        {type === 'myProfile' && <DeleteButton id={id}/>}
      </div>
    </article>
  );
};

export default RequestCard;