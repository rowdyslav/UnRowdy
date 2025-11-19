import { useQuery } from '@tanstack/react-query'
import type { CategoryType } from '@/shared/types/categoryType.ts'
import { categoriesApi } from '@/shared/api/categories.ts'

export const useCategories = (parentId?: string) => {
  return useQuery<CategoryType[]>({
    queryKey: ['categories', parentId],

    queryFn: async () => {
      const response = await (parentId
        ? categoriesApi.getSubCategories(parentId)
        : categoriesApi.getCategories())
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  })
}
