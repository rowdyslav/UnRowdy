import { FilterEnum } from '@/entities/categories/model/types/filter.enum.ts'
import FilterSlider from '@/features/filterCategory/ui/filterSlider.tsx'
import {
  type FilterQueryTypes,
  FilterSchema,
} from '@/features/filterCategory/model/types/Filter.schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import Field from '@/shared/components/Field.tsx'
import { useForm } from 'react-hook-form'

const FilterCategory = ({ maxPrice }: { maxPrice: number | undefined }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, handleSubmit, setValue, watch } = useForm<FilterQueryTypes>({
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
    if (min_price) newParams.set(FilterEnum.min_price, min_price)
    if (max_price) newParams.set(FilterEnum.max_price, max_price)

    setSearchParams(newParams)
  }

  const handleSliderChange = (values: number[]) => {
    setValue('min_price', values[0].toString())
    setValue('max_price', values[1].toString())
  }

  const prices = [Number(watch('min_price')), Number(watch('max_price')) || maxPrice || 10000]

  return (
    <div className='card-element p-4 shadow-sm h-fit sticky top-4'>
      <form className='flex flex-col gap-y-3' onSubmit={handleSubmit(setURLQuery)}>
        <Field label='Поиск'>
          <input placeholder='Ключевые слова' className='input py-2' {...register('keywords')} />
        </Field>

        <div className='flex gap-x-3 items-end'>
          <label className='text-lg font-bold color-font-light w-fit'>
            Цена, ₽
            <input
              {...register('min_price')}
              min={0}
              type='number'
              placeholder='От 0'
              className='input p-2'
            />
          </label>
          <input
            {...register('max_price')}
            min={0}
            type='number'
            placeholder={`До ${maxPrice || ''}`}
            className='input p-2 text-lg font-bold color-font-light'
          />
        </div>

        <div className='px-2'>
          <FilterSlider
            maxPrice={maxPrice || undefined}
            onSliderChange={handleSliderChange}
            prices={prices}
          />
        </div>

        <button className='button-blue p-2 w-full' type='submit'>
          Найти услуги
        </button>
      </form>
    </div>
  )
}

export default FilterCategory
