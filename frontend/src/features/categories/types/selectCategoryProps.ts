import type { CategoriesType } from '@/shared/types/categoriesType.ts'

export type SelectProps = {
  name: 'subcategory' | 'category'
  data: CategoriesType[]
}
