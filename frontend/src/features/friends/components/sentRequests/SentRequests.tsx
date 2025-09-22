import Spinner from "@/shared/ui/Spinner.tsx";
import SentCard from "@/features/friends/ui/sentCard/sentCard.tsx";
import useSentRequests from "@/features/friends/lib/useSentRequests.ts";

const RequestFriends = () => {
  const { data: sentRequests, isLoading } = useSentRequests();

  if(!sentRequests || sentRequests.length === 0) return null
  return (
    <div className='card-element p-4'>
      <h4 className='color-font text-2xl font-medium mb-6'>Отправленные заявки в друзья</h4>

      {isLoading ? <div className='in-center'><Spinner/></div> : null}

      <ul>
        {!isLoading ? sentRequests.map((user) => (
            <li key={user.id}><SentCard name={user.username} id={user.id}/>
            </li>
          ))
          : null}
      </ul>
    </div>
  );
};

export default RequestFriends;