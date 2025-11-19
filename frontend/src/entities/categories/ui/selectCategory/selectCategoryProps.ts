import type { CategoryType } from '@/shared/types/categoryType.ts'

export type SelectProps = {
  name: 'subcategory' | 'category'
  data: CategoryType[]
}
