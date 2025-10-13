import type { CategoriesPickerProps } from '@/features/categories/types/pickerType.ts'

const CategoryPicker = ({ activeCategory, setActiveCategory }: CategoriesPickerProps) => {
  const data = ['Все категории', 'Разработка и IT', 'ИИ технологии']

  return (
    <div className='card-element p-4 shadow-sm h-fit sticky top-4'>
      <h2 className='text-2xl font-semibold color-font mb-3'>Категории</h2>

      <ul className='grid gap-y-1'>
        {data.map((category, index) => (
          <li key={index}>
            <button
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer py-2.5 px-2 w-full text-left rounded-lg font-medium transition duration-100 
              ${activeCategory === category ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100 color-font-light'}`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryPicker
