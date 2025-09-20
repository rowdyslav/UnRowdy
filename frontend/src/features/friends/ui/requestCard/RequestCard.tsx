import type {
  RequestCardProps
} from "@/features/friends/types/friendCardProps.ts";
import AcceptButton
  from "@/features/friends/components/acceptButton/AcceptButton.tsx";


const RequestCard = ({name, id}: RequestCardProps) => {
  return (
    <article className='rounded-lg bg-blue-100 p-4 flex justify-between'>
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
          {name ? <p className='text-xl font-bold color-font'>{name}</p> : null}
          {name ? <p
            className='color-font-light'
          >Очень крутой разработчик</p> : null}
        </div>
      </div>

      <AcceptButton id={id}/>
    </article>
  );
};

export default RequestCard;