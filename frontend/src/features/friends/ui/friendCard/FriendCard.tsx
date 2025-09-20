import type {
  RequestCardProps
} from "@/features/friends/types/friendCardProps.ts"
import DeleteButton
  from "@/features/friends/components/deleteButton/DeleteButton.tsx";

const RequestCard = ({name, id}: RequestCardProps) => {
  return (
    <article
      className='card-element p-4 flex justify-between transition-all duration-75 hover:shadow-lg'
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

      <DeleteButton id={id}/>
    </article>
  );
};

export default RequestCard;