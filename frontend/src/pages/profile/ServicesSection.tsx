import MyServices
  from "@/features/service/components/MyServices/MyServices.tsx";
import ToCreateService
  from "@/features/service/components/ToCreateService/ToCreateService.tsx";

const ServicesSection = () => {
  return (
    <section className='container flex flex-col gap-y-6'>
      <div className='flex gap-1 items-center'>
        <h3 className='text-2xl font-bold color-font'>Мои услуги</h3>
        <div className='rounded-full bg-blue-500 w-6 h-6'>+</div>
      </div>
      <MyServices/>
      <ToCreateService/>
    </section>
  );
};

export default ServicesSection;