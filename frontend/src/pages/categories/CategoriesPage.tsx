import { useCategories } from '@/entities/categories/api/useCategories.ts'
import CategoriesSkeleton from '@/shared/ui/Categories.Skeleton.tsx'
import SubCategoriesList from '@/entities/categories/ui/SubCategoriesList.tsx'

const CategoriesPage = () => {
  const { data: categoriesData = [], isLoading } = useCategories()

  return (
    <section className='container grid grid-cols-[1fr_3.4fr] gap-x-10'>
      {/* CATEGORY PICKER*/}
      <nav className='card-element p-4 shadow-sm h-fit sticky top-4'>
        <h2 className='text-2xl font-semibold color-font mb-3'>Категории</h2>

        <ul className='grid gap-y-1'>
          {categoriesData.map((category, index) => (
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
      </nav>

      {/*CATEGORIES LIST*/}
      {isLoading ? (
        <CategoriesSkeleton catCount={1} subCount={1} />
      ) : (
        <ul>
          {categoriesData.map(category => (
            <li key={category.name} id={category.name}>
              <h3 className='color-font text-3xl font-semibold mb-6'>{category.name}</h3>
              <SubCategoriesList parentId={category._id} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CategoriesPage
