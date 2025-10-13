import { useLoaderData } from 'react-router-dom'
import type { ServiceApiGetType } from '@/shared/types/serviceTypes.ts'
import Service from '@/features/service/components/Service.tsx'
import OrderCard from '@/features/service/components/OrderCard.tsx'
import SellerCard from '@/pages/service/components/SellerCard.tsx'

const ServicePage = () => {
  const { image_b64, name, price, description, user }: ServiceApiGetType = useLoaderData()

  return (
    <section className='container-mini grid grid-cols-[2fr_1fr] gap-x-6'>
      <Service name={name} image_b64={image_b64} description={description || null} />

      <div className='flex flex-col gap-y-3'>
        <OrderCard price={price} />
        <SellerCard username={user.username} id={user.id} />
      </div>
    </section>
  )
}

export default ServicePage
