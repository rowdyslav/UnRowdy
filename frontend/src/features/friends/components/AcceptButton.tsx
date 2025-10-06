import { useAccept } from '@/features/friends/hooks/useAccept.ts'

const AcceptButton = ({ id }: { id: string }) => {
  const { mutate: addFriend } = useAccept()

  return (
    <button className='button-blue bg-green-400 h-10 flex items-center my-auto' onClick={() => addFriend(id)}>
      Принять
    </button>
  )
}

export default AcceptButton
