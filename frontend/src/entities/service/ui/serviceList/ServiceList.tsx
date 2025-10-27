import type { ServiceListProps } from '@/entities/service/ui/serviceList/serviceListProps.ts'
import ServiceCard from '@/entities/service/ui/serviceCard/ServiceCard.tsx'

const ServiceList = ({ servicesData, children, type }: ServiceListProps) => {
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
