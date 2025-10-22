import type { ServiceListProps } from '@/features/service/types/serviceListProps.ts'
import ServiceCard from '@/features/service/ui/ServiceCard.tsx'
import { Skeleton } from '@/shared/ui/Skeleton.tsx'

const ServiceList = ({ isLoading, servicesData, children, type }: ServiceListProps) => {
  if (isLoading)
    return (
      <ul className='grid grid-cols-3 gap-3 w-full'>
        <Skeleton className='h-[340px]' />
        <Skeleton className='h-[340px]' />
        <Skeleton className='h-[340px]' />
      </ul>
    )

  return (
    <ul className='grid grid-cols-3 gap-3 w-full'>
      {servicesData &&
        servicesData.map((service, index) => (
          <li key={index}>
            <ServiceCard {...service} type={type} />
          </li>
        ))}
      {children}
    </ul>
  )
}

export default ServiceList
