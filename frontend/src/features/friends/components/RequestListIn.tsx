import { useRequestIn } from '@/features/friends/hooks/useRequestsIn.ts'
import RequestInCard from '@/features/friends/ui/RequestInCard.tsx'

const RequestListIn = () => {
  const { data: friendsData } = useRequestIn()

  if (!friendsData || friendsData.length === 0) return null

  return (
    <div className='card-element p-4'>
      <h4 className='color-font text-2xl font-medium mb-6'>Полученные заявки в друзья</h4>

      <ul>
        {friendsData.map(user => (
          <li key={user.id}>
            <RequestInCard name={user.username} id={user.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RequestListIn
