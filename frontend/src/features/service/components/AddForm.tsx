import {
  ServiceFormSchema,
  type ServiceFormType,
} from '@/features/service/types/ServiceForm.schema.ts'
import ImageInput from '@/shared/components/imageInput/ImageInput.tsx'
import NavButton from '@/shared/components/NavButton.tsx'
import type { ServiceType } from '@/shared/types/serviceType.ts'
import { useAdd } from '@/features/service/hooks/useAdd.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { fileToBase64 } from '@/shared/utils/fileToBase64.ts'

const AddForm = () => {
  const methods = useForm<ServiceFormType>({ resolver: zodResolver(ServiceFormSchema) })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const { mutateAsync: addService } = useAdd()

  const onSubmit = async (data: ServiceFormType) => {
    try {
      let image_b64: string = ''

      if (typeof data.image === 'string') {
        image_b64 = data.image
      } else if (data.image instanceof FileList && data.image.length > 0) {
        image_b64 = await fileToBase64(data.image[0])
      }

      const payload: ServiceType = {
        name: data.name,
        description: data.description || '',
        price: data.price,
        image_b64: image_b64,
      }

      await addService(payload)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <FormProvider {...methods}>
      <div className='card-element hover:shadow-sm w-[85%] p-5'>
        <form className='grid gap-y-5' onSubmit={handleSubmit(onSubmit)} id='service-form'>
          {/* НАЗВАНИЕ */}
          <div className='add-flex'>
            <h3 className='text-lg font-bold color-font-light'>Название</h3>
            <input
              {...methods.register('name')}
              placeholder='Например, "Создание майнкрафт сервера"'
              className='input py-2'
            />
            <p className='text-center text-red-400'>{errors?.name?.message}</p>
          </div>

          {/* ОПИСАНИЕ */}
          <div className='add-flex'>
            <h3 className='text-lg font-bold color-font-light'>Описание</h3>
            <textarea
              {...methods.register('description')}
              placeholder='Например, "Создание майнкрафт сервера ДЕШЕВО И БЫСТРО!!!"'
              className='input py-2'
            />
            <p className='text-center text-red-400'>{errors?.description?.message}</p>
          </div>

          {/* ИЗОБРАЖЕНИЕ */}
          <div className='add-flex'>
            <h3 className='text-lg font-bold color-font-light'>Обложка услуги</h3>
            <ImageInput register={methods.register} error={errors?.image} />
          </div>

          {/* ЦЕНА */}
          <div className='add-flex'>
            <h3 className='text-lg font-bold color-font-light'>Цена</h3>
            <input
              {...methods.register('price', { valueAsNumber: true })}
              placeholder='10000'
              className='input py-2'
              type='number'
              min={0}
            />
            <p className='text-center text-red-400'>{errors?.price?.message}</p>
          </div>
        </form>
      </div>

      <div className='flex w-[85%] gap-x-6 justify-end items-center'>
        <NavButton to={-1} />

        <button type='submit' form='service-form' className='button-blue py-2'>
          Создать услугу
        </button>
      </div>
    </FormProvider>
  )
}

export default AddForm
