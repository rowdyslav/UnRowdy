import { useCategories } from '@/features/categories/hooks/useCategories.ts'
import CategoryCard from '@/features/categories/ui/CategoryCard.tsx'
import { Skeleton } from '@/shared/ui/Skeleton.tsx'

const SubCategoriesList = ({ parentId }: { parentId: string }) => {
  const { data: subCategoriesData, isLoading } = useCategories(parentId)

  if (isLoading)
    return (
      <ul className='grid grid-cols-3 gap-4 mb-12'>
        <Skeleton className='w-full h-40' />
        <Skeleton className='w-full h-40' />
      </ul>
    )

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
