import { Skeleton } from '@/shared/ui/Skeleton.tsx'

const SubcategoriesSkeleton = ({ count }: { count: number }) => {
  return (
    <ul className='grid grid-cols-3 gap-4 mb-12'>
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <Skeleton className='w-full h-40' />
        </li>
      ))}
    </ul>
  )
}

export default SubcategoriesSkeleton
