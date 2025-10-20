import { useLoaderData } from 'react-router-dom'
import type { ServiceApiGetType } from '@/shared/types/serviceTypes.ts'
import Service from '@/features/service/components/Service.tsx'
import OrderCard from '@/features/service/components/OrderCard.tsx'
import SellerCard from '@/pages/service/components/SellerCard.tsx'

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
