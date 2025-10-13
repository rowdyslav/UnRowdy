import type { CardProps } from '@/features/friends/types/friendCardProps.ts'

const RequestCard = ({ name, children }: CardProps) => {
  return (
    <article className='card-element p-4 flex justify-between items-center'>
      <div className='flex gap-x-2'>
        <img src='/public/icons/accCircle2.svg' alt='' height={50} width={50} />

        <div className='flex flex-col'>
          {name && <p className='text-xl font-bold color-font'>{name}</p>}
          {name && <p className='color-font-light'>Очень крутой разработчик</p>}
        </div>
      </div>

      <div className='flex gap-x-2'>{children}</div>
    </article>
  )
}

export default RequestCard
