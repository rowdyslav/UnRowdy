import type {ServiceListProps} from '@/features/service/types/serviceListProps.ts'
import ServiceCard from '@/features/service/ui/ServiceCard.tsx'
import {Skeleton} from "@/shared/ui/Skeleton.tsx";

const ServiceList = ({isLoading, servicesData, children, type}: ServiceListProps) => {

  if (isLoading) return (
    <ul className='grid grid-cols-3 gap-3 w-full'>
      <Skeleton className='h-52'/><Skeleton className='h-52'/><Skeleton className='h-52'/>
    </ul>
  )

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
              type={type}
            />
          </li>
        ))}
      {children}
    </ul>
  )
}

export default ServiceList
