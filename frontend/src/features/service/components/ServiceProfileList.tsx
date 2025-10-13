import ServiceProfileCard from '@/features/service/ui/ServiceProfileCard.tsx'
import ToAdd from '@/features/service/ui/ToAdd.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import { useServices } from '@/features/service/hooks/useServices.ts'
import { Skeleton } from '@/shared/ui/Skeleton.tsx'

const ServiceProfileList = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const { data: servicesData, isLoading } = useServices()

  if (isLoading) return <Skeleton className={'w-1/3 h-[354px]'} />

  if (servicesData?.length === 0 && isMyProfile) return <ToAdd />

  return (
    <>
      <ul className='grid grid-cols-3 gap-3 w-full'>
        {servicesData &&
          servicesData.map((service, index) => (
            <li key={index}>
              <ServiceProfileCard
                name={service.name}
                price={service.price}
                image_b64={service.image_b64}
                description={service.description}
                id={service.id}
              />
            </li>
          ))}
      </ul>
    </>
  )
}

export default ServiceProfileList
