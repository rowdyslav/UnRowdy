import Spinner from "@/shared/ui/Spinner.tsx";
import {
  useRequestFriends
} from "@/features/friends/hooks/useRequestsIn.ts";
import RequestInCard from "@/features/friends/ui/RequestInCard.tsx";

const RequestListIn = () => {
  const {data: requestFriends, isLoading} = useRequestFriends();

  if (!requestFriends || requestFriends.length === 0) return null

  return (
    <div className='card-element p-4 '>
      <h4
        className='color-font text-2xl font-medium mb-6'
      >Полученные заявки в друзья
      </h4>

      {isLoading ? <div className='center-inline'><Spinner/></div> : null}

      <ul>
        {!isLoading ? requestFriends.map((user) => (
            <li key={user.id}><RequestInCard name={user.username} id={user.id}/>
            </li>
          ))
          : null}
      </ul>
    </div>
  );
};

export default RequestListIn;