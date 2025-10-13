import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/const/routes.ts'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import type { ServiceTypes } from '@/shared/types/serviceTypes.ts'

const ServiceProfileCard = ({ name, price, image_b64, description, id }: ServiceTypes) => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const navigate = useNavigate()

  return (
    <article className='w-full card-element h-fit'>
      <img
        src={`data:${image_b64}`}
        alt='/'
        className='rounded-t-lg cursor-pointer h-48 w-full object-cover'
        onClick={() => navigate(`${ROUTES.SERVICE}/${id}`)}
      />

      <div className='px-6 py-3 flex justify-between flex-col'>
        {/* Header */}
        <div className='flex justify-between flex-col'>
          <div>
            <h3 className='text-3xl font-bold color-font'>{name}</h3>
            <p className='color-font-light'>{description ? description : 'Описание отсутствует'}</p>
          </div>
          {/*<span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">*/}
          {/*  Development*/}
          {/*</span>*/}
        </div>

        {/*/!* Rating *!/*/}
        {/*<div className="flex items-center gap-1 mt-4">*/}
        {/*  <span className="text-yellow-400 text-lg">★</span>*/}
        {/*  <span className="text-sm font-medium text-gray-800">4.9</span>*/}
        {/*  <span className="text-sm text-gray-500">· 47 projects completed</span>*/}
        {/*</div>*/}

        {/* Price & Delivery */}
        <div className='flex justify-between items-center mt-2'>
          <span className='text-xl font-bold color-font'>{price} ₽</span>
          {/*<span className="text-sm text-gray-500">Delivery: 2-4 weeks</span>*/}
        </div>

        {/*/!* What's Included *!/*/}
        {/*<div className="mt-6">*/}
        {/*  <h3 className="text-sm font-semibold text-gray-700 mb-2">What's included:</h3>*/}
        {/*  <div className="flex flex-wrap gap-2">*/}
        {/*    {["React & TypeScript", "Node.js Backend", "Database Design", "API Integration", "Responsive Design"].map((item) => (*/}
        {/*      <span*/}
        {/*        key={item}*/}
        {/*        className="px-3 py-1 text-xs bg-blue-50 text-blue-600 font-medium rounded-full"*/}
        {/*      >*/}
        {/*        {item}*/}
        {/*      </span>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Buttons */}
        {isMyProfile && (
          <div className='flex justify-end'>
            <button className='button '>Редактировать услугу</button>
            {/*<button className="w-1/2 ml-2 px-4 py-2 text-sm bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">*/}
            {/*  View Analytics*/}
            {/*</button>*/}
          </div>
        )}
      </div>
    </article>
  )
}

export default ServiceProfileCard
