import { Fragment } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton.tsx'

const CategoriesSkeleton = ({ catCount, subCount }: { catCount: number; subCount: number }) => {
  return (
    <div>
      {Array.from({ length: catCount }).map((_, index) => (
        <Fragment key={index}>
          <Skeleton className='w-1/4 h-14 mb-4' />
          <ul className='grid grid-cols-3 gap-4 mb-12'>
            {Array.from({ length: subCount }).map((_, index) => (
              <Skeleton key={index} className='w-full h-36' />
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  )
}

export default CategoriesSkeleton
