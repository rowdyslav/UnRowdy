import type { CategoriesProps } from '@/features/categories/types/pickerType.ts'
import CategoryCard from '@/features/categories/ui/CategoryCard.tsx'

const dat: datType[] = [
  {
    label: 'Разработка и IT',
    cat: [
      {
        label: 'Разработка сайтов',
        count: 123,
      },
      {
        label: 'Мобильные приложения',
        count: 1323,
      },
      {
        label: 'Телеграмм бот',
        count: 1443,
      },
    ],
  },
  {
    label: 'ИИ технологии',
    cat: [
      {
        label: 'Генерация текстов',
        count: 133,
      },
      {
        label: 'Генерация картинок',
        count: 1243,
      },
      {
        label: 'Генерация стихов',
        count: 3,
      },
      {
        label: 'Генерация песен',
        count: 3,
      },
    ],
  },
]

export type datType = {
  label: string
  cat: catType[]
}

export type catType = {
  label: string
  count: number
}

const CategoriesList = ({ activeCategory }: CategoriesProps) => {
  const selectCategory =
    activeCategory === 'Все категории' ? dat : dat.filter(data => data.label === activeCategory)

  return (
    <div>
      <h3 className='color-font text-4xl font-bold mb-6'>
        {activeCategory === 'Все категории' ? 'Все категории' : ''}
      </h3>

      {selectCategory.map((category, index) => (
        <div key={index}>
          <h3 className='color-font text-3xl font-semibold  mb-6'>{category.label}</h3>
          <ul className='grid grid-cols-3 gap-4 mb-12'>
            {category.cat.map(underCat => (
              <li key={underCat.label}>
                {<CategoryCard label={underCat.label} count={underCat.count} />}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
export default CategoriesList
