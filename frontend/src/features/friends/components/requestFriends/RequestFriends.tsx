import Spinner from "@/shared/ui/Spinner.tsx";
import {
  useRequestFriends
} from "@/features/friends/lib/useGetRequestsFriends.ts";
import RequestCard from "@/features/friends/ui/requestCard/RequestCard.tsx";

const RequestFriends = () => {
  const {requestFriends, loading} = useRequestFriends();

  if(requestFriends.length === 0) return null

  return (
    <div className='card-element p-4'>
      <h4 className='color-font text-2xl font-medium mb-6'>Заявки в друзья</h4>
      {loading ? <div className='in-center'><Spinner/></div> : null}

      <ul>
      {!loading ? requestFriends.map((user) => (
          <li key={user.id}><RequestCard name={user.username} id={user.id}/>
          </li>
        ))
        : null}
      </ul>
    </div>
  );
};

export default RequestFriends;