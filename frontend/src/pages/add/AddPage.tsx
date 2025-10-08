import AddForm from '@/features/service/components/AddForm.tsx'

const AddPage = () => {
  return (
    <section className='container center flex flex-col gap-y-6'>
      <h3 className='text-2xl font-bold color-font'>Добавление новой услуги</h3>

      <AddForm />
    </section>
  )
}

export default AddPage
