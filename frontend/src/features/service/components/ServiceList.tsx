import Card from "@/features/service/ui/Card.tsx";
import type {
  ServiceListProps
} from "@/features/service/types/ServiceListProps.ts";
import Spinner from "@/shared/ui/Spinner.tsx";
import type {ProfileType} from "@/shared/types/profileType.ts";

const ServiceList = ({servicesData, isLoading, type}: ServiceListProps & ProfileType) => {
  if (isLoading) {
    return <div className='center'><Spinner/></div>
  }

  return (
    <>
      <ul className='grid grid-cols-3 gap-3 w-full'>
        {servicesData.map((service, index) => (
          <li key={index}>
            <Card
              name={service.name} price={service.price}
              image_b64={service.image_b64} type={type}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServiceList;