import type { Dispatch, SetStateAction } from 'react'

export type CategoriesPickerProps = CategoriesProps & {
  setActiveCategory: Dispatch<SetStateAction<string>>
}

export type CategoriesProps = {
  activeCategory: string
}
