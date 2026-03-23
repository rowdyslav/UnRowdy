import { ROUTES } from '@/shared/routes/routes.ts'
import { useNavigate } from 'react-router-dom'
import type { CardProps } from '@/entities/service/ui/serviceCard/serviceCardProps.ts'

const ServiceCard = ({ name, price, image_b64, id, user, type }: CardProps) => {
  const navigate = useNavigate()

  return (
    <article
      className='w-full card-element cursor-pointer pb-2 flex flex-col justify-between'
      onClick={() => navigate(`${ROUTES.SERVICE}/${id}`)}
    >
      <img src={`data:${image_b64}`} alt='/' className='rounded-t-lg h-48 w-full object-cover' />

      <div className='px-4 flex justify-between flex-col'>
        {type === 'noneProfile' && (
          <div className='flex gap-x-1 py-3 content-center items-center'>
            <img src='/icons/accountCircle.svg' alt='' width={40} height={40} />
            <p className='text-xl font-semibold color-font-light'>{user.username}</p>
          </div>
        )}

        <div className='flex justify-between flex-col'>
          <h3 className='text-2xl font-semibold color-font'>{name}</h3>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <span className='text-xl font-bold color-font'>{price}₽</span>
        </div>
      </div>
    </article>
  )
}

export default ServiceCard
