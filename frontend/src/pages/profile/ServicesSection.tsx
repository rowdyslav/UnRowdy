import ServiceList from '@/features/service/components/ServiceList.tsx'
import BadgeButtonNav from '@/shared/components/navBadge/NavBadge.tsx'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'
import { useServices } from '@/features/service/hooks/useServices.ts'
import NoServiceCard from '@/features/service/ui/NoServiceCard.tsx'
import ToAdd from '@/features/service/ui/ToAdd.tsx'
import { ROUTES } from '@/shared/const/routes.ts'

const ServicesSection = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const { data: servicesData = [], isLoading } = useServices()

  return (
    <section className='container flex flex-col gap-y-6'>
      <div className='flex gap-2 items-end'>
        <h3 className='text-2xl font-bold color-font'>{isMyProfile ? 'Мои услуги' : 'Услуги'}</h3>

        {isMyProfile && <BadgeButtonNav size={'md'} label={'Добавить'} to={ROUTES.ADD_SERVICE} />}
      </div>

      {servicesData.length === 0 && isMyProfile && <ToAdd />}
      {servicesData.length === 0 && !isMyProfile && <NoServiceCard />}

      {(isLoading || servicesData) && (
        <ServiceList servicesData={servicesData} isLoading={isLoading} type='profile'></ServiceList>
      )}
    </section>
  )
}

export default ServicesSection
