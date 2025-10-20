import { useParams } from 'react-router-dom'
import { useAllServices } from '@/features/service/hooks/useAllServices.ts'
import CategoryFilter from '@/features/categories/components/CategoryFilter.tsx'
import { useForm } from 'react-hook-form'
import ServiceList from '@/features/service/components/ServiceList.tsx'

const CategoryPage = () => {
  const {category = ''} = useParams()
  const { data: servicesData = [], isLoading } = useAllServices({category_name: category})

  const { register } = useForm<{ searchQuery: string }>()

  return (
    <section className='container '>
      <h2 className='color-font text-4xl font-semibold mb-6'>{category}</h2>

      <div className='grid grid-cols-[1fr_4fr] gap-x-6'>
        <CategoryFilter register={register} />
        <ServiceList servicesData={servicesData} isLoading={isLoading} type='noneProfile' />
      </div>
    </section>
  )
}

export default CategoryPage
