import useRequests from '@/entities/user/api/useRequests.ts'
import UserCard from '@/entities/user/ui/userCard/UserCard.tsx'
import AcceptButton from '@/features/friends/ui/AcceptButton.tsx'
import ViewProfileButton from '@/shared/components/ViewProfileButton.tsx'

type FriendRequestsListProps = {
  type: 'sent' | 'received'
  label: string
}

const FriendRequestsList = ({ type, label }: FriendRequestsListProps) => {
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

export default FriendRequestsList
