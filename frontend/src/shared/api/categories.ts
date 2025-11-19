import { api } from '@/shared/api/axios.ts'
import type { CategoryType } from '@/shared/types/categoryType.ts'

export const categoriesApi = {
  getCategories: () => api.get<CategoryType[]>('/services/categories/'),

  getSubCategories: (categoryId: string) =>
    api.get<CategoryType[]>(`/services/categories/${categoryId}`),
}
