import { useRemove } from '@/features/friends/api/useRemove.ts'
import { useConfirmStore } from '@/app/providers/confirm/confirmStore.ts'

const AcceptButton = ({ id }: { id: string }) => {
  const confirm = useConfirmStore(state => state.confirm)
  const { mutate: deleteFriend } = useRemove()

  const handleRemove = () => {
    confirm('Вы точно хотите удалить друга?', () => deleteFriend(id))
  }

  return (
    <button className='button h-10 flex items-center' onClick={handleRemove}>
      Удалить
    </button>
  )
}

export default AcceptButton
