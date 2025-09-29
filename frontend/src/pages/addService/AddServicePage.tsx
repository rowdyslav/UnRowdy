import AddForm
  from "@/features/service/components/AddForm.tsx";
import BackPageBadge from "@/shared/components/backPageBadge/BackPageBadge.tsx";

const AddServicePage = () => {
  return (
    <>
      <section className='container center flex flex-col gap-y-6 '>
        <div className='flex items-baseline justify-center gap-x-3'>
          <BackPageBadge size={'sm'} label={"Отмена"}/>
          <h3
            className='text-2xl font-bold color-font '
          >Добавление новой услуги
          </h3>
        </div>

        <AddForm/>
      </section>
    </>
  );
};

export default AddServicePage;