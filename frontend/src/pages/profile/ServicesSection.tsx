import ServiceProfileList from '@/features/service/components/ServiceProfileList.tsx'
import BadgeButtonNav from '@/shared/components/navBadge/NavBadge.tsx'
import { ROUTES } from '@/shared/const/routes.ts'
import { useProfileStore } from '@/app/providers/profile/userStore.ts'

const ServicesSection = () => {
  const isMyProfile = useProfileStore(state => state.isMyProfile)

  return (
    <section className='container flex flex-col gap-y-6'>
      <div className='flex gap-2 items-end'>
        <h3 className='text-2xl font-bold color-font'>{isMyProfile ? 'Мои услуги' : 'Услуги'}</h3>

        {isMyProfile && <BadgeButtonNav size={'md'} label={'Добавить'} to={ROUTES.ADD_SERVICE} />}
      </div>

      <ServiceProfileList />
    </section>
  )
}

export default ServicesSection
