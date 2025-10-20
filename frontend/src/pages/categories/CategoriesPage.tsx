import CategoryPicker from '@/features/categories/components/CategoryPicker.tsx'
import CategoryList from '@/features/categories/components/CategoriesList.tsx'
import { useCategories } from '@/features/categories/hooks/useCategories.ts'

const CategoriesPage = () => {
  const { data: categoriesData, isLoading } = useCategories()

  return (
    <section className='container grid grid-cols-[1fr_3.4fr] gap-x-10'>
      <CategoryPicker data={categoriesData || []} isLoading={isLoading} />
      <CategoryList data={categoriesData || []} isLoading={isLoading} />
    </section>
  )
}

export default CategoriesPage
