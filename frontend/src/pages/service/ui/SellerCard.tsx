import type { UserType } from '@/shared/types/userType.ts'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/routes/routes.ts'

const SellerCard = ({ username }: Omit<UserType, 'email'>) => {
  const navigate = useNavigate()

  return (
    <article
      className='card-element p-3 flex gap-x-2 cursor-pointer'
      onClick={() => navigate(`${ROUTES.PROFILE}/${username}`)}
    >
      <img src='/icons/accCircle2.svg' alt='' height={60} width={60} />

      <div className='flex flex-col'>
        <p className='text-2xl font-bold color-font'>{username}</p>
        <p className='color-font-light text-lg'>Очень крутой разработчик</p>
      </div>
    </article>
  )
}

export default SellerCard
