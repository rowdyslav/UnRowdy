import type { CategoryFilterProps } from '@/features/categories/types/categoryFilterProps.ts'

const CategoryFilter = ({ register }: CategoryFilterProps) => {
  return (
    <div className='card-element p-4 shadow-sm h-fit sticky top-4'>
      <h2 className='text-2xl font-semibold color-font mb-3'>Фильтр</h2>

      <div>
        <label htmlFor='search' className='block text-sm font-medium text-gray-700 mb-2'>
          Поиск по названию
        </label>

        <input
          id='search'
          type='text'
          placeholder='Введите название услуги'
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          {...register('searchQuery')}
        />
      </div>
    </div>
  )
}

export default CategoryFilter
