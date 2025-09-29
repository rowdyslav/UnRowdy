import ServiceList
  from "@/features/service/components/ServiceList.tsx";
import BadgeButtonNav from "@/shared/components/badgeButton/BadgeButton.tsx";
import {ROUTES} from "@/shared/const/routes.ts";
import {useMyServices} from "@/features/service/lib/useMyServices.ts";

const MyServicesSection = () => {
  const {data: servicesData, isLoading} = useMyServices()

  return (
    <section className='container flex flex-col gap-y-6'>
      <div className="flex gap-2 items-end">
        <h3 className="text-2xl font-bold color-font">Мои услуги</h3>
        <BadgeButtonNav size={'sm'} label={"Добавить"} to={ROUTES.ADD_SERVICE}/>
      </div>

      <ServiceList
        servicesData={servicesData || []} isLoading={isLoading}
        type={"myProfile"}
      />

    </section>
  );
};

export default MyServicesSection;