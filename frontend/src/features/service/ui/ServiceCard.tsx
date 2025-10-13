import {ROUTES} from '@/shared/const/routes.ts'
import {useNavigate} from 'react-router-dom'
import type {CardProps} from '@/features/service/types/CardProfileProps.ts'

const ServiceCard = ({name, price, image_b64, description, id, user, type}: CardProps) => {
  const navigate = useNavigate()

  return (
    <article
      className='w-full card-element cursor-pointer pb-2 flex flex-col justify-between'
      onClick={() => navigate(`${ROUTES.SERVICE}/${id}`)}
    >
      <img src={`data:${image_b64}`} alt='/' className='rounded-t-lg h-48 w-full object-cover'/>

      <div className='px-6 flex justify-between flex-col'>
        {/* Header */}
        {type === 'noneProfile' && (
          <div className='flex gap-x-1 content-center items-center'>
            <img src='/public/icons/accountCircle.svg' alt='' width={40} height={40}/>
            <p className='text-xl font-semibold color-font-light'>{user.username}</p>
          </div>
        )}

        <div className='flex justify-between flex-col'>
          <h3 className='text-3xl font-bold color-font'>{name}</h3>
          {description ? (
            <p className='color-font-light'>{description}</p>
          ) : (
            <p className='color-font-light italic'>описание отсутствует</p>
          )}
        </div>

        {/*/!* Rating *!/*/}
        {/*<div className="flex items-center gap-1 mt-4">*/}
        {/*  <span className="text-yellow-400 text-lg">★</span>*/}
        {/*  <span className="text-sm font-medium text-gray-800">4.9</span>*/}
        {/*  <span className="text-sm text-gray-500">· 47 projects completed</span>*/}
        {/*</div>*/}

        {/* Price & Delivery */}
        <div className='flex justify-between items-center mt-2'>
          <span className='text-xl font-semibold color-font'>{price} ₽</span>
          {/*<span className="text-sm text-gray-500">Delivery: 2-4 weeks</span>*/}
        </div>
      </div>
    </article>
  )
}

export default ServiceCard
