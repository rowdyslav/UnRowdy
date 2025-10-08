import { useLoaderData } from 'react-router-dom'
import type {ServiceApiType} from '@/shared/types/serviceType.ts'
import Service from '@/features/service/components/Service.tsx'
import OrderCard from '@/features/service/components/OrderCard.tsx'
import SellerCard from '@/widgets/sellerCard/SellerCard.tsx'

const ServicePage = () => {
  const {image_b64, name, price, description, user }: ServiceApiType = useLoaderData()

  return (
    <section className='container-mini center flex flex-col gap-y-6'>
      <div className='grid grid-cols-[2fr_1fr] gap-x-6'>
        <Service name={name} image_b64={image_b64} description={description} />

        <div className='flex flex-col gap-y-3'>
          <OrderCard price={price} />
          <SellerCard username={user.username} id={user.id}/>
        </div>
      </div>
    </section>
  )
}

export default ServicePage
