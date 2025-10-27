import type { userCardProps } from '@/entities/user/ui/userCard/userCardProps.ts'

const UserCard = ({ name, children, className }: userCardProps) => {
  return (
    <article className={`card-element p-4 flex justify-between items-center ${className}`}>
      <div className='flex gap-x-2 items-center h-full'>
        <img src='/icons/accCircle2.svg' alt='' className='h-4/5 w-4/5' />

        <div className='flex flex-col'>
          {name && <p className='text-xl font-bold color-font'>{name}</p>}
          {name && <p className='color-font-light text-nowrap'>Очень крутой разработчик</p>}
        </div>
      </div>

      <div className='flex gap-x-2'>{children}</div>
    </article>
  )
}

export default UserCard
