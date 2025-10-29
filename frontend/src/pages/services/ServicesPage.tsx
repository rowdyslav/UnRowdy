import FilterCategory from '@/features/filterCategory/ui/filterCategory.tsx'
import ServiceList from '@/entities/service/ui/serviceList/ServiceList.tsx'
import { useAllServices } from '@/entities/service/api/useAllServices.ts'
import { useGetCategoryFilters } from '@/features/filterCategory/model/useGetCategoryFilters.ts'
import ServicesSkeleton from '@/shared/ui/Services.Skeleton.tsx'

const ServicesPage = () => {
  const { filters } = useGetCategoryFilters()
  const { data: servicesData, isLoading } = useAllServices({ ...filters })

  return (
    <section className='container '>
      <h2 className='color-font text-4xl font-semibold mb-6'>{filters.category_name}</h2>

      <div className='grid grid-cols-[1fr_4fr] gap-x-6'>
        <FilterCategory maxPrice={servicesData?.maxPrice} />

        {isLoading ? (
          <ServicesSkeleton count={6} />
        ) : (
          <ServiceList servicesData={servicesData?.data || []} type='noneProfile' />
        )}
      </div>
    </section>
  )
}

export default ServicesPage
