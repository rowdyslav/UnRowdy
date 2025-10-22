import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FilterQueryTypes, FilterSchema } from '@/features/categories/types/Filter.schema.ts'
import Field from '@/shared/components/Field.tsx'
import { useSearchParams } from 'react-router-dom'
import { FilterEnum } from '@/features/categories/types/filterEnum.ts'

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, handleSubmit } = useForm<FilterQueryTypes>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      keywords: searchParams.get(FilterEnum.keywords) || '',
      min_price: searchParams.get(FilterEnum.min_price) || '',
      max_price: searchParams.get(FilterEnum.max_price) || '',
    },
  })

  const setURLQuery = ({ keywords, max_price, min_price }: FilterQueryTypes) => {
    const newParams = new URLSearchParams()
    if (keywords) newParams.set(FilterEnum.keywords, keywords)
    if (max_price) newParams.set(FilterEnum.max_price, max_price)
    if (min_price) newParams.set(FilterEnum.min_price, min_price)

    setSearchParams(newParams)
  }

  return (
    <div className='card-element p-4 shadow-sm h-fit sticky top-4'>
      <form className='flex flex-col gap-y-3.5' onSubmit={handleSubmit(setURLQuery)}>
        <Field label='Поиск'>
          <input placeholder='Ключевые слова' className='input py-2' {...register('keywords')} />
        </Field>

        <Field label='Цена, ₽'>
          <div className='flex gap-x-3'>
            <input
              {...register('min_price')}
              min={0}
              type='number'
              placeholder='От'
              className='input py-2'
            />
            <input
              {...register('max_price')}
              min={0}
              type='number'
              placeholder='До'
              className='input py-2'
            />
          </div>
        </Field>

        <button className='button-blue p-2 w-full' type='submit'>
          Найти
        </button>
      </form>
    </div>
  )
}

export default CategoryFilter
