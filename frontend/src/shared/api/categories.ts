import { api } from '@/shared/api/axios.ts'
import type { CategoriesType } from '@/shared/types/categoriesType.ts'

export const categoriesApi = {
  getCategories: api.get<CategoriesType[]>('/services/categories/'),

  getSubCategories: (categoryId: string) =>
    api.get<CategoriesType[]>(`/services/categories/${categoryId}`),
}
