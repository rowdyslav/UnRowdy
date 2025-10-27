import { Skeleton } from '@/shared/ui/Skeleton.tsx'

const ServicesSkeleton = ({ count }: { count: number }) => {
  return (
    <ul className='grid grid-cols-3 gap-3 w-full'>
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <Skeleton className='h-[340px]' />
        </li>
      ))}
    </ul>
  )
}

export default ServicesSkeleton
