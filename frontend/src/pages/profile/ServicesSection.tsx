import ServiceList
  from "@/features/service/components/ServiceList.tsx";
import BadgeButtonNav from "@/shared/components/badgeButton/BadgeButton.tsx";
import {ROUTES} from "@/shared/const/routes.ts";
import {useServices} from "@/features/service/hooks/useServices.ts";
import {useParams} from "react-router-dom";
import type {ProfileType} from "@/shared/types/profileType.ts";

const ServicesSection = ({type}: ProfileType) => {
  const {id} = useParams()
  const {data: servicesData, isLoading} = useServices(id || '')

  return (
    <section className='container flex flex-col gap-y-6'>
      <div className="flex gap-2 items-end">
        <h3 className="text-2xl font-bold color-font"
        >
          {type === 'myProfile' ? 'Мои услуги' : 'Услуги'}
        </h3>

        {type === 'myProfile' && (
          <BadgeButtonNav
            size={'md'} label={"Добавить"} to={ROUTES.ADD_SERVICE}
          />
        )}
      </div>

      <ServiceList
        servicesData={servicesData || []} isLoading={isLoading}
        type={type}
      />
    </section>
  );
};

export default ServicesSection;