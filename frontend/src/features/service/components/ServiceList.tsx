import Spinner from '@/shared/ui/Spinner.tsx'
import type { ServiceListProps } from '@/features/service/types/serviceListProps.ts'
import ServiceCard from '@/features/service/ui/ServiceCard.tsx'

const ServiceProfileList = ({ isLoading, servicesData }: ServiceListProps) => {
  if (isLoading) return <Spinner />

  return (
    <ul className='grid grid-cols-3 gap-3 w-full'>
      {servicesData &&
        servicesData.map((service, index) => (
          <li key={index}>
            <ServiceCard
              name={service.name}
              price={service.price}
              image_b64={service.image_b64}
              description={service.description}
              id={service.id}
              user={service.user}
            />
          </li>
        ))}
    </ul>
  )
}

export default ServiceProfileList
