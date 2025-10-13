import FriendCard from '@/features/friends/ui/FriendCard.tsx'
import ViewProfileButton from '@/shared/components/ViewProfileButton.tsx'
import AcceptButton from '@/features/friends/components/AcceptButton.tsx'
import useRequests from '@/features/friends/hooks/useRequests.ts'
import type { RequestListProps } from '@/features/friends/types/requestListProps.ts'

const RequestList = ({ type, label }: RequestListProps) => {
  const { data: requestsData } = useRequests(type)

  if (!requestsData || requestsData.length === 0) return null

  return (
    <div className='p-4'>
      <h4 className='color-font text-2xl font-medium mb-6'>{label}</h4>

      <ul>
        {requestsData.map(user => (
          <li key={user.id}>
            <FriendCard name={user.username}>
              <ViewProfileButton username={user.username} />
              {type === 'received' && <AcceptButton id={user.id} />}
            </FriendCard>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RequestList
