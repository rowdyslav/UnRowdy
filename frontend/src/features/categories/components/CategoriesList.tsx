import SubCategoriesList from '@/features/categories/components/SubCategoriesList.tsx'
import type { CategoriesType } from '@/shared/types/categoriesType.ts'
import { Skeleton } from '@/shared/ui/Skeleton.tsx'
import { Fragment } from 'react'

const CategoriesList = ({ data, isLoading }: { data: CategoriesType[]; isLoading: boolean }) => {
  if (isLoading)
    return (
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <Fragment key={index}>
            <Skeleton className='w-1/4 h-14 mb-4' />
            <ul className='grid grid-cols-3 gap-4 mb-12'>
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className='w-full h-36' />
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    )

  return (
    <div>
      {data.map(category => (
        <div key={category.name} id={category.name}>
          <h3 className='color-font text-3xl font-semibold mb-6'>{category.name}</h3>
          <SubCategoriesList parentId={category._id} />
        </div>
      ))}
    </div>
  )
}
export default CategoriesList
