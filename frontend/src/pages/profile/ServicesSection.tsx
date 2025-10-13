import BadgeButtonNav from '@/shared/components/navBadge/NavBadge.tsx'
import {ROUTES} from '@/shared/const/routes.ts'
import {useProfileStore} from '@/app/providers/profile/userStore.ts'
import {useServices} from "@/features/service/hooks/useServices.ts";
import ServiceList from "@/features/service/components/ServiceList.tsx";
import ToAdd from "@/features/service/ui/ToAdd.tsx";

const ServicesSection = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)
  const {data: servicesData, isLoading} = useServices()

  return (
    <section className='container flex flex-col gap-y-6'>
      <div className='flex gap-2 items-end'>
        <h3 className='text-2xl font-bold color-font'>{isMyProfile ? 'Мои услуги' : 'Услуги'}</h3>

        {isMyProfile && <BadgeButtonNav size={'md'} label={'Добавить'} to={ROUTES.ADD_SERVICE}/>}
      </div>

      <ServiceList servicesData={servicesData} isLoading={isLoading} type='profile'>
        <ToAdd/>
      </ServiceList>
    </section>
  )
}

export default ServicesSection
