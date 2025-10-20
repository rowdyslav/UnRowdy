import SelectCategory from '@/features/categories/components/SelectCategory.tsx'
import { useCategories } from '@/features/categories/hooks/useCategories.ts'
import { useAddService } from '@/features/service/hooks/useAddService.ts'
import type { ServiceApiPostType } from '@/shared/types/serviceTypes.ts'
import NavButton from '@/shared/components/navButton/NavButton.tsx'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import ImageInput from '@/shared/components/ImageInput.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ServiceFormSchema,
  type ServiceFormType,
} from '@/features/service/types/ServiceForm.schema.ts'
import Field from '@/shared/components/Field.tsx'

const AddService = () => {
  const methods = useForm<ServiceFormType>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: { image_b64: '', category: '', subcategory: '' },
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    setValue,
  } = methods

  const selectedCategory = useWatch({ control, name: 'category' })

  const { data: categoriesData = [] } = useCategories()
  const { data: subcategoriesData = [] } = useCategories(selectedCategory)
  const { mutateAsync: addService } = useAddService()

  const onSubmit = async ({ category, ...payloadData }: ServiceFormType) => {
    const payload: ServiceApiPostType = {
      ...payloadData,
      category_id: payloadData.subcategory || category,
    }

    await addService(payload)
  }

  return (
    <FormProvider {...methods}>
      <div className='card-element hover:shadow-sm w-[70%] p-5'>
        <form className='grid gap-y-5' onSubmit={handleSubmit(onSubmit)} id='service-form'>
          {/* НАЗВАНИЕ */}
          <Field label='Название' error={errors.name?.message}>
            <input
              {...register('name')}
              placeholder='Например, "Создание майнкрафт сервера"'
              className='input py-2'
            />
          </Field>

          {/* ОПИСАНИЕ */}
          <Field label='Описание' error={errors.description?.message}>
            <textarea
              {...register('description')}
              placeholder='Например, "Создание сервера дешево и быстро!"'
              className='input py-2'
            />
          </Field>

          {/* КАТЕГОРИИ */}
          <div className='grid grid-cols-2 gap-4'>
            <Field label='Категория' error={errors.category?.message}>
              <SelectCategory
                data={categoriesData}
                {...register('category', {
                  onChange: () => setValue('subcategory', ''),
                })}
              />
            </Field>

            <div className={`${!selectedCategory ? 'opacity-50 pointer-events-none' : ''}`}>
              <Field label='Подкатегория' error={errors.subcategory?.message}>
                <SelectCategory name='subcategory' data={subcategoriesData} />
              </Field>
            </div>
          </div>

          {/* ИЗОБРАЖЕНИЕ */}
          <Field label='Обложка услуги' error={errors.image_b64?.message}>
            <ImageInput name='image_b64' />
          </Field>

          {/* ЦЕНА */}
          <Field label='Цена' error={errors.price?.message}>
            <input
              {...register('price', { valueAsNumber: true })}
              placeholder='10000'
              className='input py-2'
              type='number'
              min={0}
            />
          </Field>
        </form>
      </div>

      <div className='flex w-[70%] gap-x-6 justify-end items-center'>
        <NavButton to='back' label='Назад' className='button' />

        <button type='submit' form='service-form' className='button-blue py-2'>
          Создать услугу
        </button>
      </div>
    </FormProvider>
  )
}

export default AddService
