import { useLoaderData } from 'react-router-dom'
import Service from '@/entities/service/ui/service/Service.tsx'
import OrderCard from '@/pages/service/ui/OrderCard.tsx'
import SellerCard from '@/pages/service/ui/SellerCard.tsx'

import type { ServiceApiGetType } from '@/shared/api/service/types.ts'

const ServicePage = () => {
  const { user, price, ...serviceProps }: ServiceApiGetType = useLoaderData()

  return (
    <section className='container-mini grid grid-cols-[2fr_1fr] gap-x-6'>
      <Service {...serviceProps} />

      <div className='flex flex-col gap-y-3'>
        <OrderCard price={price} />
        <SellerCard username={user.username} id={user.id} />
      </div>
    </section>
  )
}

export default ServicePage
