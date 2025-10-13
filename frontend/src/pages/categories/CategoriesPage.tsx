import CategoryPicker from '@/features/categories/components/CategoryPicker.tsx'
import CategoryList from '@/features/categories/components/CategoriesList.tsx'
import { useState } from 'react'

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Все категории')

  return (
    <section className='container grid grid-cols-[1fr_3.4fr] gap-x-10'>
      <CategoryPicker activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      <CategoryList activeCategory={activeCategory} />
    </section>
  )
}

export default CategoriesPage
