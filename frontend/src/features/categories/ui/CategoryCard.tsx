import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/const/routes.ts'

const CategoryCard = ({ label }: { label: string }) => {
  const encodedLabel = encodeURIComponent(label)
  
  return (
    <Link
      to={`${ROUTES.CATEGORIES}/${encodedLabel}`}
      className='card-element group p-8 hover:shadow-md hover:border-blue-400  center flex-col
     border border-neutral-200'
    >
      <img
        src='/icons/categories/code2.svg'
        alt=''
        width={50}
        height={50}
        className='bg-blue-100 group-hover:bg-blue-200 rounded-lg transition duration-100 mb-5'
      />

      <h4 className='group-hover:text-blue-500 font-medium color-font-light transition duration-100'>
        {label}
      </h4>
    </Link>
  )
}

export default CategoryCard
