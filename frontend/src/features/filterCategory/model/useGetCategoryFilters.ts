import { useParams, useSearchParams } from 'react-router-dom'
import { FilterEnum } from '@/entities/categories/model/types/filter.enum.ts'

export const useGetCategoryFilters = () => {
  const { category_name } = useParams()
  const [searchParams] = useSearchParams()

  const filters = {
    category_name,
    keywords: searchParams.get(FilterEnum.keywords),
    min_price: searchParams.get(FilterEnum.min_price),
    max_price: searchParams.get(FilterEnum.max_price),
  }

  return { filters }
}
