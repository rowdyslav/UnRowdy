import { useParams, useSearchParams } from 'react-router-dom'
import { useAllServices } from '@/features/service/hooks/useAllServices.ts'
import CategoryFilter from '@/features/categories/components/CategoryFilter.tsx'
import ServiceList from '@/features/service/components/ServiceList.tsx'
import { FilterEnum } from '@/features/categories/types/filterEnum.ts'
import { useEffect } from 'react'

const CategoryPage = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()

  const keywords = searchParams.get(FilterEnum.keywords)
  const min_price = searchParams.get(FilterEnum.min_price)
  const max_price = searchParams.get(FilterEnum.max_price)

  const {
    data: servicesData,
    isLoading,
    refetch,
  } = useAllServices({
    category,
    keywords,
    min_price,
    max_price,
  })

  useEffect(() => {
    void refetch()
  }, [keywords, min_price, max_price, refetch])

  return (
    <section className='container '>
      <h2 className='color-font text-4xl font-semibold mb-6'>{category}</h2>

      <div className='grid grid-cols-[1fr_4fr] gap-x-6'>
        <CategoryFilter />
        <ServiceList servicesData={servicesData || []} isLoading={isLoading} type='noneProfile' />
      </div>
    </section>
  )
}

export default CategoryPage
