import type { CategoriesType } from '@/shared/types/categoriesType.ts'
import { Skeleton } from '@/shared/ui/Skeleton.tsx'

const CategoryPicker = ({ data, isLoading }: { data: CategoriesType[]; isLoading: boolean }) => {
  if (isLoading) return <Skeleton className='w-[280px] h-64' />

  return (
    <div className='card-element p-4 shadow-sm h-fit sticky top-4'>
      <h2 className='text-2xl font-semibold color-font mb-3'>Категории</h2>

      <ul className='grid gap-y-1'>
        {data.map((category, index) => (
          <li key={index}>
            <a
              href={`#${category.name}`}
              className={`block cursor-pointer py-2.5 px-2 w-full text-left rounded-lg 
              font-medium transition duration-100 hover:bg-blue-100 hover:text-blue-500 color-font-light`}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryPicker
