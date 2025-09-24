import MyServices
  from "@/features/service/components/MyServices/MyServices.tsx";

const ServicesSection = () => {
  return (
    <section className='container flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Мои сервисы</h3>
      <MyServices/>

    </section>
  );
};

export default ServicesSection;