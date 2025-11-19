import {api} from "@/share/api/axios.ts";
import type {CategoryType} from "@/entities/category/types/categoryType.ts";

export const categoriesApi = {
  getCategories: () => api.get<CategoryType[]>('/services/categories/'),

  getSubCategories: (categoryId: string) =>
    api.get<CategoryType[]>(`/services/categories/${categoryId}`),
}