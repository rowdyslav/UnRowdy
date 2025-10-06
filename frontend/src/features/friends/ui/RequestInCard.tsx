import ViewProfileButton from '@/features/friends/components/ViewProfileButton.tsx'
import type { CardProps } from '@/features/friends/types/friendCardProps.ts'
import AcceptButton from '@/features/friends/components/AcceptButton.tsx'

const RequestInCard = ({ name, id }: CardProps) => {
  return (
    <article className='rounded-lg bg-blue-100 p-4 flex justify-between'>
      <div className='flex gap-x-2'>
        <img src='/public/icons/accCircle2.svg' alt='' height={50} width={50} />

        <div className='flex flex-col'>
          {name && <p className='text-xl font-bold color-font'>{name}</p>}
          {name && <p className='color-font-light'>Очень крутой разработчик</p>}
        </div>
      </div>

      <div className='center gap-x-3'>
        <ViewProfileButton username={name} />
        <AcceptButton id={id} />
      </div>
    </article>
  )
}

export default RequestInCard
