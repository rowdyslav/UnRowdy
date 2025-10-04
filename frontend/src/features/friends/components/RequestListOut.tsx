import useRequestsOut from '@/features/friends/model/useRequestsOut.ts'
import RequestOutCard from '@/features/friends/ui/RequestOutCard.tsx'
import Spinner from '@/shared/ui/Spinner.tsx'

const RequestFriends = () => {
  const { data: sentRequests, isLoading } = useRequestsOut()

  if (isLoading) return <Spinner />

  if (!sentRequests || sentRequests.length === 0) return null

  return (
    <div className='card-element p-4'>
      <h4 className='color-font text-2xl font-medium mb-6'>Отправленные заявки в друзья</h4>

      <ul>
        {sentRequests.map(user => (
          <li key={user.id}>
            <RequestOutCard name={user.username} id={user.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RequestFriends
