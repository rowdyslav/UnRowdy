import Spinner from "@/shared/ui/Spinner.tsx";
import useRequestsOut from "@/features/friends/lib/useRequestsOut.ts";
import RequestOutCard from "@/features/friends/ui/RequestOutCard.tsx";

const RequestFriends = () => {
  const {data: sentRequests, isLoading} = useRequestsOut();

  if (!sentRequests || sentRequests.length === 0) return null

  return (
    <div className='card-element p-4'>
      <h4
        className='color-font text-2xl font-medium mb-6'
      >Отправленные заявки в друзья
      </h4>

      {isLoading ? <div className='center-inline'><Spinner/></div> : null}

      <ul>
        {!isLoading ? sentRequests.map((user) => (
            <li key={user.id}>
              <RequestOutCard name={user.username} id={user.id}/>
            </li>
          ))
          : null}
      </ul>
    </div>
  );
};

export default RequestFriends;