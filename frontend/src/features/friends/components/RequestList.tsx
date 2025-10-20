import UserCard from '@/widgets/userCard/UserCard.tsx'
import ViewProfileButton from '@/shared/components/ViewProfileButton.tsx'
import AcceptButton from '@/features/friends/components/AcceptButton.tsx'
import useRequests from '@/features/friends/hooks/useRequests.ts'
import type { RequestListProps } from '@/features/friends/types/requestListProps.ts'

const RequestList = ({ type, label }: RequestListProps) => {
  const { data: requestsData } = useRequests(type)

  if (!requestsData || requestsData.length === 0) return null

  return (
    <div>
      <h4 className='color-font text-2xl font-medium mb-6'>{label}</h4>

      <ul>
        {requestsData.map(user => (
          <li key={user.id}>
            <UserCard name={user.username} className='bg-blue-50'>
              <ViewProfileButton username={user.username} />
              {type === 'received' && <AcceptButton id={user.id} />}
            </UserCard>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RequestList
