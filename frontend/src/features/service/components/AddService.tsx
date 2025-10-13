import type { ServiceApiPostType, ServiceTypes } from '@/shared/types/serviceTypes.ts'
import type { datType } from '@/features/categories/components/CategoriesList.tsx'
import SelectCategory from '@/features/categories/components/SelectCategory.tsx'
import { useAddService } from '@/features/service/hooks/useAddService.ts'
import NavButton from '@/shared/components/navButton/NavButton.tsx'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import ImageInput from '@/shared/components/ImageInput.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ServiceFormSchema,
  type ServiceFormType,
} from '@/features/service/types/ServiceForm.schema.ts'
import Field from '@/shared/components/Field.tsx'
import { useEffect } from 'react'

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

const AddService = () => {
  const methods = useForm<ServiceFormType>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: {
      image_b64: '',
      category: '',
    },
  })

  const selectedCategory = useWatch({
    control: methods.control,
    name: 'category',
  })

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  useEffect(() => {
    setValue('subcategory', '')
  }, [setValue, selectedCategory])

  const { mutateAsync: addService } = useAddService()

  const onSubmit = async (formData: ServiceApiPostType) => {
    const payload: ServiceTypes = {
      name: formData.name,
      description: formData.description,
      image_b64: formData.image_b64,
      price: formData.price,
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
              {...methods.register('name')}
              placeholder='Например, "Создание майнкрафт сервера"'
              className='input py-2'
            />
          </Field>

          {/* ОПИСАНИЕ */}
          <Field label='Описание' error={errors.description?.message}>
            <textarea
              {...methods.register('description')}
              placeholder='Например, "Создание сервера дешево и быстро!"'
              className='input py-2'
            />
          </Field>

          {/* КАТЕГОРИИ */}
          <div className='grid grid-cols-2 gap-4'>
            <Field label='Категория' error={errors.category?.message}>
              <SelectCategory name='category' data={dat} />
            </Field>

            <div className={`${!selectedCategory ? 'opacity-50 pointer-events-none' : ''}`}>
              <Field label='Подкатегория' error={errors.subcategory?.message}>
                <SelectCategory
                  name='subcategory'
                  data={dat.find(data => data.label === selectedCategory)?.cat || []}
                />
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
              {...methods.register('price', { valueAsNumber: true })}
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
