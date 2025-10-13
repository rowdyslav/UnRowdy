import type { catType, datType } from '@/features/categories/components/CategoriesList.tsx'

export type SelectProps = {
  name: 'category' | 'subcategory'
  data: datType[] | catType[]
}
