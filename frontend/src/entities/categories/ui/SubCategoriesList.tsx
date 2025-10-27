import { useCategories } from '@/entities/categories/api/useCategories.ts'
import CategoryCard from '@/entities/categories/ui/CategoryCard.tsx'
import ServicesSkeleton from '@/shared/ui/Services.Skeleton.tsx'

const SubCategoriesList = ({ parentId }: { parentId: string }) => {
  const { data: subCategoriesData, isLoading } = useCategories(parentId)

  if (isLoading) return <ServicesSkeleton count={1} />

  return (
    <ul className='grid grid-cols-3 gap-4 mb-12'>
      {subCategoriesData &&
        subCategoriesData.map(subCategory => (
          <li key={subCategory.name}>
            <CategoryCard label={subCategory.name} />
          </li>
        ))}
    </ul>
  )
}

export default SubCategoriesList
