import Card from '@/features/service/ui/Card.tsx'
import Spinner from '@/shared/ui/Spinner.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import { useServices } from '@/features/service/hooks/useServices.ts'
import ToAdd from '@/features/service/ui/ToAdd.tsx'

const ServiceList = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const { data: servicesData, isLoading } = useServices()

  if (isLoading) return <Spinner />

  if (servicesData && servicesData.length === 0 && isMyProfile) return <ToAdd />

  return (
    <>
      <ul className='grid grid-cols-3 gap-3 w-full'>
        {servicesData &&
          servicesData.map((service, index) => (
            <li key={index}>
              <Card
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

export default ServiceList
